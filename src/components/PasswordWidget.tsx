import { defineComponent } from 'vue'

import {CommonWidgetPropsDefine, CommonWidgetType} from '../../lib/types'
import {withFormItem} from '../../lib/theme-default/FormItem'

const PasswordWidget: CommonWidgetType = defineComponent({
    name: 'PasswordWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
        return () => {
            const handleChange = (e: any) => {
                const value = e.target.value
                props.onChange(value)
            }

            return (
                <input
                    type="password"
                    value={props.value as any}
                    onInput={handleChange}
                />
            )
        }
    }
})

export default withFormItem(PasswordWidget)