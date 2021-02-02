import {defineComponent, PropType, provide, reactive, ref, Ref, shallowRef, watch, watchEffect} from 'vue'

import {Schema} from './types'
import SchemaItem from './SchemaItem'
import {SchemaFormContextKey} from './context'
import Ajv, { Options } from 'ajv'
import {ErrorSchema, validateFormData} from './validator'

interface ContextRef {
    doValidate: () => Promise<{
        errors: any[],
        valid: boolean,
    }>
}

// 要使用ajv-errors需要传入{allErrors: true}
const defaultAjvOptions: Options = {
    allErrors: true,
}

export default defineComponent({
    name: 'SchemaForm',
    props: {
        schema: {
            type: Object as PropType<Schema>,
            required: true,
        },
        value: {
            required: true,
        },
        onChange: {
            type: Function as PropType<(v: any) => void>,
            required: true,
        },
        // 已改为从theme.tsx中获取
        // theme: {
        //     type: Object as PropType<Theme>,
        //     required: true,
        // },
        // 用于校验
        contextRef: {
            type: Object as PropType<Ref<ContextRef | undefined>>
        },
        ajvOptions: {
            type: Object as PropType<Options>
        },
        local: {
            type: String,
            default: 'zh'
        },
        customValidate: {
            type: Function as PropType<(data: any, errors: any) => void>
        }
    },
    setup(props, {slots, emit, attrs}) {
        const handleChange = (v:any) => {
            props.onChange(v)
        }

        const context: any = reactive({
            // 这里提供的是一个固定组件不会改变所以不使用reactive也可以
            SchemaItem,
            // 向下提供theme，已改为从theme.tsx中获取
            // theme: props.theme,
        })

        const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})

        const validatorRef: Ref<Ajv> = shallowRef() as any
        watchEffect(() => {
          validatorRef.value = new Ajv({
            ...defaultAjvOptions,
            ...props.ajvOptions,
          })
        })

        // 保存返回校验结果的方式
        const validateResolveRef = ref()
        // 记录每次校验的上下文
        const validateIndex = ref(0)

        // 监听数据变化
        watch(() => props.value, () => {
            // 在触发校验后执行
            if(validateResolveRef.value) {
                doValidate()
            }
        }, {deep: true})
        async function doValidate() {
            const index = validateIndex.value += 1
            const result =  await validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.local,
                props.customValidate
            )
            console.log('result', result);

            // 判断当前是否最新的校验，不是直接返回
            if(index !== validateIndex.value) return

            errorSchemaRef.value = result.errorSchema
            // 返回结果
            validateResolveRef.value(result)
            // 清空
            validateResolveRef.value = undefined
            // return result
        }

        // 校验
        watch(() => props.contextRef, () => {
            if(props.contextRef) {
                props.contextRef.value = {
                    doValidate() {
                        // // 可能返回promise但是这里一定是布尔值
                        // // const valid = validatorRef.value.validate(props.schema, props.value) as boolean

                        // const result = await validateFormData(
                        //     validatorRef.value,
                        //     props.value,
                        //     props.schema,
                        //     props.local,
                        //     props.customValidate
                        // )
                        // console.log('result', result);
                        // errorSchemaRef.value = result.errorSchema
                        // return result

                        return new Promise(resolve => {
                            validateResolveRef.value = resolve
                            doValidate()
                        })
                    }
                }
            }
        }, {
            immediate: true,
        })

        // 向子节点提供SchemaItem组件
        provide(SchemaFormContextKey, context)

        return () => {
            const {schema, value} = props

            return <SchemaItem
                rootSchema={schema}
                schema={schema}
                value={value}
                onChange={handleChange}
                errorSchema={errorSchemaRef.value || {}}
            />
        }
    }
})