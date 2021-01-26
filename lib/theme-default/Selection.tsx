import { defineComponent, ref, watch } from "vue";

import { SelectionWidgetPropsDefine, SelectionWidgetType } from "../types";

const Selection: SelectionWidgetType = defineComponent({
    name: 'SelectionWidget',
    props: SelectionWidgetPropsDefine,
    setup(props, {slots, emit, attrs}) {
        const currentValueRef = ref(props.value)
        watch(currentValueRef, (newv, oldv) => {
            if(newv !== oldv) {
                props.onChange(newv)
            }
        })
        watch(
            () => props.value,
            (v) => {
                if(v !== currentValueRef.value) {
                    currentValueRef.value = v
                }
            }
        )
        return () => {
            const {options} = props
            // console.log('options', options);
            
            return (
                <select multiple={true} v-model={currentValueRef.value}>
                    {options.map(opt => (
                        <option value={opt.value}>{opt.key}</option>
                    ))}
                </select>
            )
        }
    }
})

export default Selection