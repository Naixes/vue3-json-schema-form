import {defineComponent, PropType} from 'vue'

import {FieldPropsDefine, Schema, SchemaTypes} from './types'
import SchemaItem from './SchemaItem'

export default defineComponent({
    name: 'SchemaForm',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        return () => {
            const {schema, value} = props
            const handleChange = (v:any) => {
                props.onChange(v)
            }
            return <SchemaItem
                schema={schema}
                value={value}
                onChange={handleChange}
            />
        }
    }
})