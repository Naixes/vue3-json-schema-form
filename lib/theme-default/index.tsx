import {defineComponent} from 'vue'

export default defineComponent({
    name: 'theme',
    setup(props, {slots, emit, attrs}) {
        return () => {
            return <div>111</div>
        }
    }
})