import {defineComponent} from 'vue'

import {FieldPropsDefine} from '../types'

export default defineComponent({
    name: 'NumberField',
    props: FieldPropsDefine,
    setup(props, {slots, emit, attrs}) {
        const handleChange = (e: any) => {
            // 返回的值是一个字符串
            const value = e.target.value
            const num = Number(value)
            if(Number.isNaN(num)) {
                props.onChange(undefined)
            }else {
                props.onChange(num)
            }
        }

        return () => {
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