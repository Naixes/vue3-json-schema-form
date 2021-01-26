import {defineComponent} from 'vue'

import {CommonWidgetNames, FieldPropsDefine} from '../types'
import {getWidget} from '../theme'

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

        const NumberWidget = getWidget(CommonWidgetNames.NumberWidget).value
        console.log('NumberWidget', NumberWidget);
        

        return () => {
            const {schema, rootSchema, ...rest} = props
            return (
                // <input
                //     type="number"
                //     value={props.value as any}
                //     onInput={handleChange}
                // />
                <NumberWidget {...rest} onChange={handleChange}></NumberWidget>
            )
        }
    }
})