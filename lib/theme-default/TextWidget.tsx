import { defineComponent } from 'vue'
import {CommonWidgetPropsDefine, CommonWidgetType} from '../types'

const TextWidget: CommonWidgetType = defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
        return () => {
            const handleChange = (e: any) => {
                props.onChange(e.target.value)
            }

            return (
                <input
                    type="text"
                    value={props.value as any}
                    onInput={handleChange}
                />
            )
        }
    }
})

export default TextWidget