import { defineComponent, nextTick } from 'vue'
import {CommonWidgetPropsDefine, CommonWidgetType} from '../types'

const TextWidget: CommonWidgetType = defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
        return () => {
            const handleChange = (e: any) => {
                const value = e.target.value

                // 实现重置输入的值方法二：
                // e.target.value = props.value
                // props.onChange(e.target.value)
                
                // debugger
                props.onChange(value)

                // 实现重置输入的值方法一：
                // 执行过上面的代码此时props中的value还没有变化还是之前的值
                // nextTick(() => {
                //     // 如果父级对value有修改，此时的dom已经更新了，这里的props.value和e.target.value都是修改过后的值；如果父级对value没有修改这里的props.value是之前的值e.target.value是修改后的新值（？？？经测试是一样的值），这里的dom经历两次变化会影响性能
                //     if(props.value !== e.target.value) {
                //         // 重置
                //         e.target.value = props.value
                //     }
                // })
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