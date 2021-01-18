import { createApp, defineComponent, h, reactive, ref } from "vue";
// import App from "./App.vue";

import HelloWorld from './components/HelloWorld.vue'
// ts校验不通过换位 require 的写法
// import img from './assets/logo.png'
// eslint 报错：不允许 require ，取消当前行的 eslint 检查
const img = require('./assets/logo.png') // eslint-disable-line

// // h函数：=====================================

// // render函数
// // 使用 h 函数模拟 app 文件（sfc：single file component）生成 vue 组件， app 文件编译完差不多也是这样
// const App = defineComponent({
//     render() {
//         // h相当于React中的createElement用于创建节点
//         // 原生节点使用字符串
//         // 参数：节点类型，属性，子节点
//         return h('div', {id: 'app'}, [
//             h('img', {
//                 alt: "Vue logo",
//                 // 图片显示不出，因为在template中的图片地址vue-loader会进行寻址，这里需要自己引入图片
//                 // src: "./assets/logo.png",
//                 src: img,
//             }),
//             h(HelloWorld, {
//                 msg: "Welcome to Your Vue.js + TypeScript App",
//                 name: "naxies",
//             })
//         ])
//     }
// })

// // setup返回render函数的写法=======================
// const App = defineComponent({
//     setup() {
//         // 这里还可以写其他的代码
//         const state = reactive({
//             age: 18
//         })
        
//         const ageRef = ref(18)
//         setInterval(() => {
//             ageRef.value += 1
//         }, 1000)

//         // 返回render函数
//         return () => {
//             // 把这句放在render函数外面页面显示是不会根据定时器动态变化的
//             // 因为setup只执行一次，ageRefNum永远是初始化的值
//             // reactive或者ref的变化会使这个render函数重新执行形成dom树，所以最终值的读取都需要在render中执行
//             const ageRefNum = ageRef.value
//             return h('div', {id: 'app'}, [
//                 h('img', {
//                     alt: "Vue logo",
//                     src: img,
//                 }),
//                 h(HelloWorld, {
//                     msg: "Welcome to Your Vue.js + TypeScript App",
//                     name: "naxies",
//                 }),
//                 // 可以获取到闭包的值
//                 h('h2', state.age),
//                 h('h2', 'ageRef ' + ageRefNum)
//             ])
//         }
//     }
// })

// tsx写法=======================================
// 见app.tsx
import App from './App'

createApp(App).mount("#app");
