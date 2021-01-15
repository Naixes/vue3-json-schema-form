## 开发日志

### 构建项目

@vue/cli 4.5.10

自定义：默认+ts+unit test+no class-style+eslint+prettier+jest

#### 使用prettier

安装Prettier - Code formatter vscode插件

创建.prettierrc

```json
{
    "semi": false,
    "singleQuote": true,
    "arrowParens": "always",
    "trailingComma": "all"
}
```

配置setting：Format On Save，建议保存为工作区配置

### 一些概念

#### vue3中的tsAPI

##### component接口

###### defineConponent函数

主要是返回了组件的类型定义，具体的实现就很简单

```ts
// vue-next/package/runtime-core/src/apiDefineComponent.ts
// 各种定义
...
// implementation, close to no-op
export function defineComponent(options: unknown) {
  return isFunction(options) ? { setup: options, name: options.name } : options
}
```

定义props

```html
...
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    // 简写
    msg: String,
    // 完整写法
    name: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
```

提取通用的props定义时require不起作用的坑

```html
...
<script lang="ts">
import { defineComponent, PropType } from "vue";

const PropsType = {
    msg: String,
    name: {
        type: String as PropType<string>,
        // 必填
        required: true,
    },
// 解决方法：加上as const，手动告诉ts这个对象是只读的
} as const

export default defineComponent({
    name: "HelloWorld",
    props: PropsType,
    mounted() {
        // 这里的name提示还可能是undefined
        // 原因：这里的{ required: true }没有被正确的试别因为ts不知道这个对象是只读的，只有只读的才可以让{ required: true }被ts正确试别
        // 查看源码defineComponent定义中提到的的注释：
        // the Readonly constraint allows TS to treat the type of { required: true } as constant instead of boolean.
        // PropsOptions extends Readonly<ComponentPropsOptions>,
        this.name
    }
});
</script>
```

#### h函数

相当于React中的createElement

```ts
// main.ts
import { createApp, defineComponent, h } from "vue";
// import App from "./App.vue";

import HelloWorld from './components/HelloWorld.vue'
// ts校验不通过换位 require 的写法
// import img from './assets/logo.png'
// eslint 报错：不允许 require ，取消当前行的 eslint 检查
const img = require('./assets/logo.png') // eslint-disable-line

// 使用 h 函数模拟 app 文件（sfc：single file component）生成 vue 组件， app 文件编译完差不多也是这样
const App = defineComponent({
    render() {
        // h相当于React中的createElement用于创建节点
        // 原生节点使用字符串
        // 参数：节点类型，属性，子节点
        return h('div', {id: 'app'}, [
            h('img', {
                alt: "Vue logo",
                // 图片显示不出，因为在template中的图片地址vue-loader会进行寻址，这里需要自己引入图片
                // src: "./assets/logo.png",
                src: img,
            }),
            h(HelloWorld, {
                msg: "Welcome to Your Vue.js + TypeScript App",
                name: "naxies",
            })
        ])
    }
})

createApp(App).mount("#app");

```

##### 源码

实际上是createVNode的封装，把下面代码h换为createVNode也是可以的

```ts
// vue-next/package/runtime-core/src/apiDefineComponent.ts
// 各种定义
...
// Actual implementation
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  const l = arguments.length
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren)
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}
```

createVNode参数除了h一样的三个参数外还有一些优化的参数，vue-loader会通过这些进行一些优化

#### setup

```html
// App.vue
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" name="naxies" />
  <h2>{{state.age}}~</h2>
  <!-- 可以不用.value是因为sfc会进行判断当前是不是一个ref -->
  <h2>ref {{ageRef}}~</h2>
  <h2>computedAgeRef {{computedAgeRef}}~</h2>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watchEffect } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  mounted() {
    // this中的ref是代理的也可以不用写.value，会自动判断
    console.log(this.ageRef)
  },
  // 和data一样只会在初始化时执行一次
  setup(props, {slots, attrs, emit}) {
    // 返回：sfc返回对象
    const state = reactive({
      age: 18
    })
    setInterval(() => {
      state.age += 1
    }, 1000)

    // 返回{value: xxx}结构的对象，value是响应式的
    const ageRef = ref(18)
    setInterval(() => {
      ageRef.value += 1
    }, 1000)

    // computed
    const computedAgeRef = computed(() => {
      return ageRef.value + 2
    })

    // watchEffect：会在函数引用到的所有reactive和ref变化时执行
    watchEffect(() => {
      // 每次ageRef赋值都会执行
      console.log(ageRef.value);
    })

    // 不能使用{...state}的方式返回，返回的不是响应式
    return {
      state,
      ageRef,
      computedAgeRef
    }
  }
})
</script>
```

setup返回render函数的用法

```ts
// main.ts
import { createApp, defineComponent, h, reactive, ref } from "vue";
// import App from "./App.vue";

import HelloWorld from './components/HelloWorld.vue'
const img = require('./assets/logo.png') // eslint-disable-line

// setup返回render函数的写法=======================
const App = defineComponent({
    setup() {
        // 这里还可以写其他的代码
        const state = reactive({
            age: 18
        })
        
        const ageRef = ref(18)
        setInterval(() => {
            ageRef.value += 1
        }, 1000)

        // 返回render函数
        return () => {
            // 把这句放在render函数外面页面显示是不会根据定时器动态变化的
            // 因为setup只执行一次，ageRefNum永远是初始化的值
            // reactive或者ref的变化会使这个render函数重新执行形成dom树，所以最终值的读取都需要在render中执行
            const ageRefNum = ageRef.value
            return h('div', {id: 'app'}, [
                h('img', {
                    alt: "Vue logo",
                    src: img,
                }),
                h(HelloWorld, {
                    msg: "Welcome to Your Vue.js + TypeScript App",
                    name: "naxies",
                }),
                // 可以获取到闭包的值
                h('h2', state.age),
                h('h2', 'ageRef ' + ageRefNum)
            ])
        }
    }
})

createApp(App).mount("#app");
```

#### jsx

