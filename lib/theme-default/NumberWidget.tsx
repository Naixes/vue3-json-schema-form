import { defineComponent } from 'vue'
import {CommonWidgetPropsDefine, CommonWidgetType} from '../types'

import {withFormItem} from './FormItem'

const NumberWidget: CommonWidgetType = defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
        return () => {
            const handleChange = (e: any) => {
                const value = e.target.value
                // debugger
                props.onChange(value)
            }

            return (
                <input
                    type="number"
                    value={props.value as any}
                    onInput={handleChange}
                />
            )
        }
    }
})

export default withFormItem(NumberWidget)