import {computed, defineComponent} from 'vue'

import {CommonWidgetNames, FieldPropsDefine} from '../types'
import {getWidgetRef} from '../theme'

export default defineComponent({
    name: 'StringField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        // 可以做一些额外的事情再调用父级的方法
        const handleChange = (v: string) => {
            // ...
            // props.onChange(v + '1')
            props.onChange(v)
        }

        const TextWidgetRef = computed(() => {
            const widgetRef = getWidgetRef(CommonWidgetNames.TextWidget, props.uiSchema)
            return widgetRef.value
        })

        return () => {
            const {schema, rootSchema, errorSchema, ...rest} = props
            const TextWidget = TextWidgetRef.value
            return (
                // 这样写会报错，因为写了两个onChange被merge成了数组，这是vue编译器的默认行为，可以手动关闭
                <TextWidget
                    {...rest}
                    errors={errorSchema.__errors}
                    onChange={handleChange}
                    schema={schema}
                ></TextWidget>
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