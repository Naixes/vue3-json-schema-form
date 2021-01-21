import {defineComponent, PropType, provide, reactive} from 'vue'

import {Schema} from './types'
import SchemaItem from './SchemaItem'
import {SchemaFormContextKey} from './context'

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
        }
    },
    setup(props, {slots, emit, attrs}) {
        const handleChange = (v:any) => {
            props.onChange(v)
        }

        // 这里提供的是一个固定组件不会改变所以不使用reactive也可以
        const context: any = reactive({
            SchemaItem
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
            />
        }
    }
})