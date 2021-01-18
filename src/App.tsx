import { defineComponent, reactive, ref } from "vue";

import HelloWorld from './components/HelloWorld.vue'
const img = require('./assets/logo.png') // eslint-disable-line

// tsx写法=======================================
export default defineComponent({
    setup() {
        const state = reactive({
            age: 18
        })
        
        const ageRef = ref(18)
        setInterval(() => {
            ageRef.value += 1
        }, 1000)

        return () => {
            const ageRefNum = ageRef.value
            return (
                <div>
                    <img alt="Vue logo" src={img} />
                    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" name="naxies" />
                    <h2>{state.age}</h2>
                    <h2>ageRefNum {ageRefNum}~</h2>
                </div>
            )
        }
    }
})
