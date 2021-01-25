import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
    name: 'SelectionWidget',
    props: {
        value: {},
        onChange: {
            type: Function as PropType<(v: any) => void>,
            required: true
        },
        options: {
            type: Array as PropType<{
                key: string,
                value: any
            }[]>,
            required: true
        },
    },
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