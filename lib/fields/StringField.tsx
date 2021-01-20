import {defineComponent, PropType} from 'vue'

import {Schema, SchemaTypes} from '../types'

export default defineComponent({
    name: 'StringField',
    props: {
    },
    setup(props, {slots, emit, attrs}) {
        return () => {
            return (
                <div>string field</div>
            )
        }
    }
})