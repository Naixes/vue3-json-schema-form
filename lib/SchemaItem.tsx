import {defineComponent, PropType} from 'vue'

import {Schema, SchemaTypes} from './types'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField'

// 负责根据类型分发给不同的组件
export default defineComponent({
    name: 'SchemaItem',
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
        return () => {
            const {schema} = props

            // TODO：type未指定时需要猜测type

            const type = schema.type
            let Component: any
            switch (type) {
                case SchemaTypes.STRING:
                    Component = StringField
                    break;
                case SchemaTypes.NUMBER:
                    Component = NumberField
                    break;
                default:
                    console.error(`${type} is not supported`);
                    break;
            }
            return <Component {...props} />
        }
    }
})