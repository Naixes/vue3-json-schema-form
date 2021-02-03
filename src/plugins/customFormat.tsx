import { computed, defineComponent } from "vue";

import { CommonWidgetPropsDefine, CustomFormat } from "../../lib";
import { withFormItem } from "../../lib/theme-default/FormItem";

const format: CustomFormat = {
    name: 'color',
    definition: {
        type: 'string',
        // string（会被转成正则），RegExp，fn：(data: T) => boolean
        // 十六进制颜色正则
        validate: /^#[0-9A-Fa-f]{6}$/,
        // 用来判断前后是否有变化
        // compare?: FormatCompare<T>
    },
    component: withFormItem(defineComponent({
        name: 'ColorWidget',
        props: CommonWidgetPropsDefine,
        setup(props) {
            return () => {
                const handleChange = (e: any) => {
                    const value = e.target.value
                    props.onChange(value)
                }
    
                return (
                    <input
                        type="color"
                        value={props.value as any}
                        onInput={handleChange}
                    />
                )
            }
        }
    }))
}

export default format