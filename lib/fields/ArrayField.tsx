import {DefineComponent, defineComponent, ExtractPropTypes, inject, PropType} from 'vue'

import {FieldPropsDefine, Schema, SchemaTypes} from '../types'
import { SchemaFormContextKey, useVJSFContext } from '../context'
import { isObject } from '../utils'
import { createUseStyles } from 'vue-jss'
import SelectionWidget from '../widgets/Selection'

/**
 * 三种情况
 * 
 * 都是同一种类型，默认对长度没有限制
 * {
 *      items: {type: 'string'}
 * }
 * 固定长度，分别是哪些类型
 * {
 *      items: [
 *          {type: 'string'},
 *          {type: 'numer'}
 *      ]
 * }
 * enum表示可选项
 * {
 *      items: {type: 'string', enum: ['1', '2']}
 * }
 */

const useStyles = createUseStyles({
    container: {
        border: '1px solid #eee',
    },
    actions: {
        background: '#eee',
        padding: 10,
        textAlign: 'right',
    },
    action: {
        '& + &': {
        marginLeft: 10,
        },
    },
    content: {
        padding: 10,
    },
})

const ArrayItemWrapper = defineComponent({
    name: 'ArrayItemWrapper',
    props: {
        index: {
            type: Number,
            required: true,
        },
        onAdd: {
            type: Function as PropType<(index: number) => void>,
            required: true,
        },
        onDelete: {
            type: Function as PropType<(index: number) => void>,
            required: true,
        },
        onUp: {
            type: Function as PropType<(index: number) => void>,
            required: true,
        },
        onDown: {
            type: Function as PropType<(index: number) => void>,
            required: true,
        }
    },
    setup(props, {slots}) {
        const classesRef = useStyles()
        const handleAdd = () => props.onAdd(props.index)
        const handleDelete = () => props.onDelete(props.index)
        const handleUp = () => props.onUp(props.index)
        const handleDown = () => props.onDown(props.index)

        return () => {
            const classes = classesRef.value
            return (
                <div class={classes.container}>
                    <div class={classes.actions}>
                        <button onClick={handleAdd} class={classes.action}>新增</button>
                        <button onClick={handleDelete} class={classes.action}>删除</button>
                        <button onClick={handleUp} class={classes.action}>上移</button>
                        <button onClick={handleDown} class={classes.action}>下移</button>
                    </div>
                    {/* slots.default返回一个函数 */}
                    <div class={classes.content}>{slots.default && slots.default()}</div>
                </div>
            )
        }
    }
})

export default defineComponent({
    name: 'ArrayField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        const context = useVJSFContext()

        const handleArrayItemChange = (v: any, index: number) => {
            const {value} = props
            const arrValue = Array.isArray(value) ? value : []
            arrValue[index] = v
            props.onChange(arrValue)
        }

        const handleAdd = (index: number) => {
            const {value} = props
            const arrValue = Array.isArray(value) ? value : []
            arrValue.splice(index + 1, 0, undefined)
            props.onChange(arrValue)
        }

        const handleDelete = (index: number) => {
            const {value} = props
            const arrValue = Array.isArray(value) ? value : []
            arrValue.splice(index, 1)
            props.onChange(arrValue)
        }

        const handleUp = (index: number) => {
            if(index === 0) return
            const {value} = props
            const arrValue = Array.isArray(value) ? value : []
            const item = arrValue.splice(index, 1)[0]
            arrValue.splice(index - 1, 0, item)
            props.onChange(arrValue)
        }

        const handleDown = (index: number) => {
            const {value} = props
            const arrValue = Array.isArray(value) ? value : []
            if(index === arrValue.length - 1) return
            const item = arrValue.splice(index, 1)[0]
            arrValue.splice(index + 1, 0, item)
            props.onChange(arrValue)
        }

        return () => {
            const {SchemaItem} = context
            const {schema, rootSchema, value} = props
            // 判断是否是固定长度
            const isMultiType = Array.isArray(schema.items)
            // 是否有可选项
            const isSelect = schema.items && (schema.items as any).enum

            if(isMultiType) {
                // 固定长度数组
                const items: Schema[] = schema.items as any
                const arrValue = Array.isArray(value) ? value : []
                return items.map((s: Schema, index: number) => (
                    <SchemaItem
                        rootSchema={rootSchema}
                        schema={s}
                        key={index}
                        value={arrValue}
                        onChange={(v: any) => handleArrayItemChange(v, index)}
                    ></SchemaItem>
                ))
            }else if(!isSelect) {
                // 单一类型数组
                const arrValue = Array.isArray(value) ? value : []
                return arrValue.map((v: any, index: number) => (
                    <ArrayItemWrapper
                        index={index}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        onUp={handleUp}
                        onDown={handleDown}
                    >
                        <SchemaItem
                            rootSchema={rootSchema}
                            schema={schema.items as Schema}
                            key={index}
                            value={v}
                            onChange={(v: any) => handleArrayItemChange(v, index)}
                        ></SchemaItem>
                    </ArrayItemWrapper>
                ))
            }else {
                // 包含列表项
                const enumOptions = (schema as any).items.enum
                const options = enumOptions.map((e: any) => ({
                    key: e,
                    value: e
                }))
                return (
                    <SelectionWidget
                        onChange={props.onChange}
                        value={props.value}
                        options={options}
                    ></SelectionWidget>
                )
            }
        }
    }
})