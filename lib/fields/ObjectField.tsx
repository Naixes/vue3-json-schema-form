import {DefineComponent, defineComponent, ExtractPropTypes, inject} from 'vue'

import {FieldPropsDefine, Schema, SchemaTypes} from '../types'
import { SchemaFormContextKey } from '../context'
import { isObject } from '../../lib/utils'

// 借助ExtractPropTypes可以将对象转换成类型，源码中已经加过了
type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>

export default defineComponent({
    name: 'ObjectField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        const context: {SchemaItem: SchemaItemDefine} | undefined = inject(SchemaFormContextKey)

        if(!context) {
            throw Error('SchemaForm shuold bu used')
        }

        const handleObjectFieldChange = (k: string, v: any) => {
            const value: any = isObject(props.value) ? props.value : {}

            if(v === undefined) {
                delete value[k]
            }else {
                value[k] = v
            }

            props.onChange(value)
        }

        return () => {
            const {schema, rootSchema, value} = props
            const {SchemaItem} = context
            const properties = schema.properties || {}
            const currentValue: any = isObject(value) ? value : {}

            return Object.keys(properties).map((k: string, index: number) => (
                <SchemaItem
                    schema={properties[k]}
                    rootSchema={rootSchema}
                    value={currentValue[k]}
                    key={index}
                    onChange={(v: any) => handleObjectFieldChange(k, v)}
                ></SchemaItem>
            ))
        }
    }
})