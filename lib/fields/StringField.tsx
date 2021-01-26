import {defineComponent} from 'vue'

import {CommonWidgetNames, FieldPropsDefine} from '../types'
import {getWidget} from '../theme'

export default defineComponent({
    name: 'StringField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        // 可以做一些额外的事情再调用父级的方法
        const handleChange = (v: string) => {
            // ...
            props.onChange(v)
        }

        const TextWidget = getWidget(CommonWidgetNames.TextWidget).value

        return () => {
            const {schema, rootSchema, ...rest} = props
            return (
                // 这样写会报错，因为写了两个onChange被merge成了数组，这是vue编译器的默认行为，可以手动关闭
                <TextWidget {...rest} onChange={handleChange}></TextWidget>
                // 已提取到theme-default中
                // <input
                //     type="text"
                //     value={props.value as any}
                //     onInput={handleChange}
                // />
            )
        }
    }
})