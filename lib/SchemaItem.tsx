import {computed, defineComponent} from 'vue'

import {FieldPropsDefine, SchemaTypes} from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import {retrieveSchema} from './utils'
import { useVJSFContext } from './context'

// 负责根据类型分发给不同的组件
export default defineComponent({
    name: 'SchemaItem',
    // 从SchemaItem组件开始，分发下去的所有组件props都是FieldPropsDefine
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        const formContext = useVJSFContext()

        // 处理schema
        // 会返回一个ref
        const retrievedSchemaRef = computed(() => {
            const {schema, rootSchema, value} = props
            return formContext.transformSchemaRef(retrieveSchema(schema, rootSchema, value))
        })
        return () => {
            const {schema} = props
            const retrievedSchema = retrievedSchemaRef.value

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
                case SchemaTypes.OBJECT:
                    Component = ObjectField
                    break;
                case SchemaTypes.ARRAY:
                    Component = ArrayField
                    break;
                default:
                    console.error(`${type} is not supported`);
                    break;
            }
            return <Component {...props} schema={retrievedSchema} />
        }
    }
})