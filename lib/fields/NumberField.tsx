import {defineComponent} from 'vue'

import {CommonWidgetNames, FieldPropsDefine} from '../types'
import {getWidgetRef} from '../theme'

export default defineComponent({
    name: 'NumberField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        const handleChange = (v: string) => {
            // e.target.value返回的值是一个字符串
            const num = Number(v)
            if(Number.isNaN(num)) {
                props.onChange(undefined)
            }else {
                props.onChange(num)
            }
        }

        const NumberWidget = getWidgetRef(CommonWidgetNames.NumberWidget).value
        console.log('NumberWidget', NumberWidget);
        

        return () => {
            const {schema, rootSchema, errorSchema, ...rest} = props
            return (
                // <input
                //     type="number"
                //     value={props.value as any}
                //     onInput={handleChange}
                // />
                <NumberWidget
                    {...rest}
                    errors={errorSchema.__errors}
                    onChange={handleChange}
                    schema={schema}
                ></NumberWidget>
            )
        }
    }
})