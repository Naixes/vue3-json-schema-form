import {DefineComponent, defineComponent, ExtractPropTypes, inject} from 'vue'

import {CommonFieldType, FieldPropsDefine, Schema, SchemaTypes} from '../types'
import { SchemaFormContextKey, useVJSFContext } from '../context'
import { isObject } from '../../lib/utils'

export default defineComponent({
    name: 'ObjectField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        
        // 获取SchemaForm提供的SchemaItem
        const context = useVJSFContext()

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
            const {schema, rootSchema, value, errorSchema, uiSchema} = props
            const {SchemaItem} = context
            const properties = schema.properties || {}
            const currentValue: any = isObject(value) ? value : {}

            return Object.keys(properties).map((k: string, index: number) => (
                <SchemaItem
                    schema={properties[k]}
                    rootSchema={rootSchema}
                    uiSchema={uiSchema.properties ? uiSchema.properties[k] || {} : {}}
                    value={currentValue[k]}
                    key={index}
                    onChange={(v: any) => handleObjectFieldChange(k, v)}
                    errorSchema={errorSchema[k] || {}}
                ></SchemaItem>
            ))
        }
    }
})