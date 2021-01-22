import {DefineComponent, defineComponent, ExtractPropTypes, inject} from 'vue'

import {FieldPropsDefine, Schema, SchemaTypes} from '../types'
import { SchemaFormContextKey, useVJSFContext } from '../context'
import { isObject } from '../utils'

/**
 * 三种情况
 * 
 * 都是同一种类型
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
export default defineComponent({
    name: 'ArrayField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        const context = useVJSFContext()

        const handleMultiTypeChange = (v: any, index: number) => {
            const {value} = props
            const arrValue = Array.isArray(value) ? value : []
            arrValue[index] = v
            props.onChange(arrValue)
        }

        return () => {
            const {SchemaItem} = context
            const {schema, rootSchema, value} = props
            const isMultiType = Array.isArray(schema.items)
            
            // 判断是否是固定长度
            if(isMultiType) {
                const items: Schema[] = schema.items as any
                const arrValue = Array.isArray(value) ? value : []
                return items.map((s: Schema, index: number) => (
                    <SchemaItem
                        rootSchema={rootSchema}
                        schema={s}
                        key={index}
                        value={arrValue}
                        onChange={(v: any) => handleMultiTypeChange(v, index)}
                    ></SchemaItem>
                ))
            }
            return <div>111</div>
        }
    }
})