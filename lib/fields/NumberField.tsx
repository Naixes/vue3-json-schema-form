import {defineComponent, PropType} from 'vue'

import {Schema, SchemaTypes} from '../types'

export default defineComponent({
    name: 'NumberField',
    props: {
    },
    setup(props, {slots, emit, attrs}) {
        return () => {
            return (
                <div>number field</div>
            )
        }
    }
})