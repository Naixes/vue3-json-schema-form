import {defineComponent, PropType, provide, reactive} from 'vue'

import {Schema, Theme} from './types'
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
        },
        // 已改为从theme.tsx中获取
        // theme: {
        //     type: Object as PropType<Theme>,
        //     required: true,
        // }
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