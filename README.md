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

#### vue3中的API

##### sfc的新的开发方式-0000

还未合并请查看最新https://github.com/vuejs/rfcs/pull/227

```vue
<script setup>
  // imported components are also directly usable in template
  import Foo from './Foo.vue'
  import { ref } from 'vue'

  // write Composition API code just like in a normal setup()
  // but no need to manually return everything
  const count = ref(0)
  const inc = () => {
    count.value++
  }
</script>

<template>
  <Foo :count="count" @click="inc" />
</template>
```

<details open="" style="box-sizing: border-box; display: block; margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="box-sizing: border-box; display: list-item; cursor: pointer;">Compiled Output</summary><div class="highlight highlight-text-html-basic" style="box-sizing: border-box; margin-bottom: 16px;"><pre style="box-sizing: border-box; font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, monospace; font-size: 13.6px; margin-top: 0px; margin-bottom: 0px; overflow-wrap: normal; padding: 16px; overflow: auto; line-height: 1.45; background-color: var(--color-bg-tertiary); border-radius: 6px; word-break: normal;"><span class="pl-kos" style="box-sizing: border-box;">&lt;</span><span class="pl-ent" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity-tag);">script</span> <span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">setup</span><span class="pl-kos" style="box-sizing: border-box;">&gt;</span>
  <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">import</span> <span class="pl-v" style="box-sizing: border-box; color: var(--color-prettylights-syntax-variable);">Foo</span> <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">from</span> <span class="pl-s" style="box-sizing: border-box; color: var(--color-prettylights-syntax-string);">'./Foo.vue'</span>
  <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">import</span> <span class="pl-kos" style="box-sizing: border-box;">{</span> <span class="pl-s1" style="box-sizing: border-box;">ref</span> <span class="pl-kos" style="box-sizing: border-box;">}</span> <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">from</span> <span class="pl-s" style="box-sizing: border-box; color: var(--color-prettylights-syntax-string);">'vue'</span>

  <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">export</span> <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">default</span> <span class="pl-kos" style="box-sizing: border-box;">{</span>
    <span class="pl-en" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity);">setup</span><span class="pl-kos" style="box-sizing: border-box;">(</span><span class="pl-kos" style="box-sizing: border-box;">)</span> <span class="pl-kos" style="box-sizing: border-box;">{</span>
      <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">const</span> <span class="pl-s1" style="box-sizing: border-box;">count</span> <span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">=</span> <span class="pl-en" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity);">ref</span><span class="pl-kos" style="box-sizing: border-box;">(</span><span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">1</span><span class="pl-kos" style="box-sizing: border-box;">)</span>
      <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">const</span> <span class="pl-en" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity);">inc</span> <span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">=</span> <span class="pl-kos" style="box-sizing: border-box;">(</span><span class="pl-kos" style="box-sizing: border-box;">)</span> <span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">=&gt;</span> <span class="pl-kos" style="box-sizing: border-box;">{</span>
        <span class="pl-s1" style="box-sizing: border-box;">count</span><span class="pl-kos" style="box-sizing: border-box;">.</span><span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">value</span><span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">++</span>
      <span class="pl-kos" style="box-sizing: border-box;">}</span>

      <span class="pl-k" style="box-sizing: border-box; color: var(--color-prettylights-syntax-keyword);">return</span> <span class="pl-kos" style="box-sizing: border-box;">{</span>
        Foo<span class="pl-kos" style="box-sizing: border-box;">,</span> <span class="pl-c" style="box-sizing: border-box; color: var(--color-prettylights-syntax-comment);">// see note below</span>
        count<span class="pl-kos" style="box-sizing: border-box;">,</span>
        inc<span class="pl-kos" style="box-sizing: border-box;">,</span>
      <span class="pl-kos" style="box-sizing: border-box;">}</span>
    <span class="pl-kos" style="box-sizing: border-box;">}</span><span class="pl-kos" style="box-sizing: border-box;">,</span>
  <span class="pl-kos" style="box-sizing: border-box;">}</span>
<span class="pl-kos" style="box-sizing: border-box;">&lt;/</span><span class="pl-ent" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity-tag);">script</span><span class="pl-kos" style="box-sizing: border-box;">&gt;</span>

<span class="pl-kos" style="box-sizing: border-box;">&lt;</span><span class="pl-ent" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity-tag);">template</span><span class="pl-kos" style="box-sizing: border-box;">&gt;</span>
  <span class="pl-kos" style="box-sizing: border-box;">&lt;</span><span class="pl-ent" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity-tag);">Foo</span> <span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">:count</span>="<span class="pl-s" style="box-sizing: border-box; color: var(--color-prettylights-syntax-string);">count</span>" <span class="pl-c1" style="box-sizing: border-box; color: var(--color-prettylights-syntax-constant);">@click</span>="<span class="pl-s" style="box-sizing: border-box; color: var(--color-prettylights-syntax-string);">inc</span>" /&gt;
<span class="pl-kos" style="box-sizing: border-box;">&lt;/</span><span class="pl-ent" style="box-sizing: border-box; color: var(--color-prettylights-syntax-entity-tag);">template</span><span class="pl-kos" style="box-sizing: border-box;">&gt;</span></pre></div><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 16px;"><strong style="box-sizing: border-box; font-weight: 600;">Note:</strong><span>&nbsp;</span>the SFC compiler also extracts binding metadata from<span>&nbsp;</span><code style="box-sizing: border-box; font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, monospace; font-size: 13.6px; padding: 0.2em 0.4em; margin: 0px; background-color: var(--color-markdown-code-bg); border-radius: 6px;">&lt;script setup&gt;</code><span>&nbsp;</span>and use it during template compilation. This is why the template can use<span>&nbsp;</span><code style="box-sizing: border-box; font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, monospace; font-size: 13.6px; padding: 0.2em 0.4em; margin: 0px; background-color: var(--color-markdown-code-bg); border-radius: 6px;">Foo</code><span>&nbsp;</span>as a component here even though it's returned from<span>&nbsp;</span><code style="box-sizing: border-box; font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, monospace; font-size: 13.6px; padding: 0.2em 0.4em; margin: 0px; background-color: var(--color-markdown-code-bg); border-radius: 6px;">setup()</code><span>&nbsp;</span>instead of registered via<span>&nbsp;</span><code style="box-sizing: border-box; font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, monospace; font-size: 13.6px; padding: 0.2em 0.4em; margin: 0px; background-color: var(--color-markdown-code-bg); border-radius: 6px;">components</code><span>&nbsp;</span>option.</p></details>



**Declaring Props and Emits**

```vue
<script setup>
  import { defineProps, defineEmit } from 'vue'

  // expects props options
  const props = defineProps({
    foo: String,
  })
  // expects emits options
  const emit = defineEmits(['update', 'delete'])
</script>
```

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
        // reactive 和 ref 都是用来定义响应式数据的 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型，可以简单的理解为ref是对reactive的二次包装, ref定义的数据访问的时候要多一个.value
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

https://github.com/vuejs/jsx-next

Install the plugin with:

```
npm install @vue/babel-plugin-jsx -D
```

Then add the plugin to .babelrc:

```
{
  "plugins": ["@vue/babel-plugin-jsx"]
}
```

优势：ts可以在编译时进行校验（ts不能识别vue文件中导出的类型，都是一个统一的类型），使用灵活（通过函数返回复用html片段等），可以使用指令

#### json-schema

用来定义json数据，校验数据，多端通用

官方草案：json-schema.org

##### ajv

json-schema的js库，https://ajv.js.org/

```js
// or ESM/TypeScript import
// import Ajv from "ajv"
// Node.js require:
const Ajv = require("ajv").default
const addFormats = require("ajv-formats")
const localize = require('ajv-i18n');

// 简单的
let schema = {
    type: 'string',
    minLength: 10,
}
// 复杂一点的
schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 10,
        },
        age: {
            type: 'number',
        },
        pets: {
            type: 'array',
            // 第一种定义方式
            // items: {
            //     type: 'string',
            // },
            // 第二种
            items: [
                { type: 'string', },
                { type: 'number', }
            ]
        },
        email: {
            type: 'string',
            format: 'email',
        },
        testFormatProperty: {
            type: 'string',
            format: 'testFormat',
        },
        testKeywordProperty: {
            type: 'string',
            testKeyword: 'testKeyword',
            // ajv-errors提供
            // 任何一条规则错误都只会显示这个错误信息
            // errorMessage: '你又错了！',
            // 区分关键字设置错误信息
            errorMessage: {
                type: '你传的不是字符串，连字符串都不认识吗！',
                testKeyword: '你猜猜你又错哪了！'
            },
        }
    },
    required: ['name', 'age'],
}

let data = 'naixes'
data = {
    name: 'naixes',
    age: 18,
    pets: ['egg core', 2],
    testFormatProperty: 'testFormat',
    testKeywordProperty: 'hello!',
}

// 要使用ajv-errors需要传入{allErrors: true}
const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {allErrors: true}
// 版本7以上 formats 需要单独安装插件
addFormats(ajv)

// 引入ajv-errors库
require('ajv-errors')(ajv)

// 自定义format
ajv.addFormat('testFormat', (data) => {
    return data === 'testFormat'
})

// 自定义关键字
ajv.addKeyword({
    keyword: 'testKeyword',

    // 方法1：validate时调用
    // validate: xx = (schema, data) => {
    //     console.log('schema', schema, 'data', data);
    //     // 自定义错误信息，也可以使用库自定义错误信息
    //     xx.errors = [
    //         {
    //             keyword: 'testKeyword',
    //             dataPath: '/testKeywordProperty',
    //             schemaPath: '#/properties/testKeywordProperty/testKeyword',
    //             params: {},
    //             message: '你错了！'
    //         }
    //     ]
    //     return data.length === 3
    // },

    // 方法2：compile时调用
    // compile: (sch, parentSchema) => {
    //     console.log('sch', sch, 'parentSchema', parentSchema);
    //     // 要返回一个函数
    //     return () => true 
    // },
    // // 这个keyword接收的值的schema
    // metaSchema: {},

    // 方法3：相当于组合多个schema
    macro: (sch, parentSchema) => {
        // console.log('sch', sch, 'parentSchema', parentSchema);
        // 要返回一个schema
        return {
            minLength: 10,
        }
    },
    metaSchema: {},

    // 会覆盖方法1中自定义的错误信息
    errors: false,
})

const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) {
    localize.zh(validate.errors)
    console.log(validate.errors)
}
```

安装：`npm i ajv`

###### Formats

format：一些常用的验证规则，只针对string和number类型

安装：`npm i ajv-formats`

From version 7 Ajv does not include formats defined by JSON Schema specification - these and several other formats are provided by [ajv-formats](https://github.com/ajv-validator/ajv-formats) plugin.

To add all formats from this plugin:

```js
import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)
```

- *date*: full-date according to [RFC3339](http://tools.ietf.org/html/rfc3339#section-5.6).
- *time*: time with optional time-zone.
- *date-time*: date-time from the same source (time-zone is mandatory).
- *duration*: duration from [RFC3339](https://tools.ietf.org/html/rfc3339#appendix-A)
- *uri*: full URI.
- *uri-reference*: URI reference, including full and relative URIs.
- *uri-template*: URI template according to [RFC6570](https://tools.ietf.org/html/rfc6570)
- *url* (deprecated): [URL record](https://url.spec.whatwg.org/#concept-url).
- *email*: email address.
- *hostname*: host name according to [RFC1034](http://tools.ietf.org/html/rfc1034#section-3.5).
- *ipv4*: IP address v4.
- *ipv6*: IP address v6.
- *regex*: tests whether a string is a valid regular expression by passing it to RegExp constructor.
- *uuid*: Universally Unique IDentifier according to [RFC4122](http://tools.ietf.org/html/rfc4122).
- *json-pointer*: JSON-pointer according to [RFC6901](https://tools.ietf.org/html/rfc6901).
- *relative-json-pointer*: relative JSON-pointer according to [this draft](http://tools.ietf.org/html/draft-luff-relative-json-pointer-00).

自定义format

**ajv.addFormat(name: string, format: Format): Ajv**

```
type Format =
  | true // to ignore this format (and pass validation)
  | string // will be converted to RegExp
  | RegExp
  | (data: string) => boolean
  | Object // format definition (see below and in types)
```

Add format to validate strings or numbers.

If object is passed it should have properties `validate`, `compare` and `async`:

```
interface FormatDefinition { // actual type definition is more precise - see types.ts
  validate: string | RegExp | (data: number | string) => boolean | Promise<boolean>
  compare: (data1: string, data2: string): number // an optional function that accepts two strings
    // and compares them according to the format meaning.
    // This function is used with keywords `formatMaximum`/`formatMinimum`
    // (defined in [ajv-keywords](https://github.com/ajv-validator/ajv-keywords) package).
    // It should return `1` if the first value is bigger than the second value,
    // `-1` if it is smaller and `0` if it is equal.
  async?: true // if `validate` is an asynchronous function
  type?: "string" | "number" // "string" is default. If data type is different, the validation will pass.
}
```

Formats can be also added via `formats` option.

###### keywords

自定义关键字的四种方法

- [code generation function](https://ajv.js.org/docs/keywords.html#define-keyword-with-code-generation-function) - used by all pre-defined keywords

  不常用

- [validation function](https://ajv.js.org/docs/keywords.html#define-keyword-with-validation-function)

  validate时调用

  ```ts
  ajv.addKeyword({
    keyword: "constant",
    validate: (schema, data) =>
      typeof schema == "object" && schema !== null ? deepEqual(schema, data) : schema === data,
    errors: false,
  })
  
  const schema = {
    constant: 2,
  }
  const validate = ajv.compile(schema)
  console.log(validate(2)) // true
  console.log(validate(3)) // false
  
  const schema = {
    constant: {foo: "bar"},
  }
  const validate = ajv.compile(schema)
  console.log(validate({foo: "bar"})) // true
  console.log(validate({foo: "baz"})) // false
  ```

- [compilation function](https://ajv.js.org/docs/keywords.html#define-keyword-with-compilation-function)

  compile时调用

  ```ts
  ajv.addKeyword({
    keyword: "range",
    type: "number",
    compile([min, max], parentSchema) {
      return parentSchema.exclusiveRange === true
        ? (data) => data > min && data < max
        : (data) => data >= min && data <= max
    },
    errors: false,
    metaSchema: {
      // schema to validate keyword value
      type: "array",
      items: [{type: "number"}, {type: "number"}],
      minItems: 2,
      additionalItems: false,
    },
  })
  
  const schema = {
    range: [2, 4],
    exclusiveRange: true,
  }
  const validate = ajv.compile(schema)
  console.log(validate(2.01)) // true
  console.log(validate(3.99)) // true
  console.log(validate(2)) // false
  console.log(validate(4)) // false
  ```

- [macro function](https://ajv.js.org/docs/keywords.html#define-keyword-with-macro-function)

  *相当于组合多个schema*

  ```ts
  ajv.addKeyword({
    keyword: "range",
    type: "number",
    macro: ([minimum, maximum]) => ({minimum, maximum}), // schema with keywords minimum and maximum
    // metaSchema: the same as in the example above
  })
  ```

###### 错误信息

显示中文的错误信息：

安装ajv-i18n

```js
var Ajv = require('ajv'); // version >= 2.0.0
var localize = require('ajv-i18n');

// option `i18n` is required for this package to work
var ajv = Ajv({ allErrors: true });
var validate = ajv.compile(schema);
var valid = validate(data);

if (!valid) {
    // ru for Russian
    localize.ru(validate.errors);
    // string with all errors and data paths
    console.log(ajv.errorsText(validate.errors, { separator: '\n' }));
}
```

自定义错误信息

```ts
...
// 自定义关键字
ajv.addKeyword({
    keyword: 'testKeyword',

    // 方法1：validate时调用
    validate: xx = (schema, data) => {
        console.log('schema', schema, 'data', data);
        // 自定义错误信息
        xx.errors = [
            {
                keyword: 'testKeyword',
                dataPath: '/testKeywordProperty',
                schemaPath: '#/properties/testKeywordProperty/testKeyword',
                params: {},
                message: '你错了！'
            }
        ]
        return data.length === 3
    },

    // 会覆盖自定义的错误信息
    // errors: false,
})
...
```

库：ajv-errors

```js
const Ajv = require("ajv").default
const ajv = new Ajv({allErrors: true})
// Ajv option allErrors is required
require("ajv-errors")(ajv /*, {singleError: true} */)

const schema = {
  type: "object",
  required: ["foo"],
  properties: {
    foo: {type: "integer"},
  },
  additionalProperties: false,
  errorMessage: "should be an object with an integer property foo only",
}

const validate = ajv.compile(schema)
console.log(validate({foo: "a", bar: 2})) // false
console.log(validate.errors) // processed errors
```

### 组件定义和接口

#### Props

```jsx
<JsonSchemaForm
	schema={schema}   
    value={value}
    locale={locale}
    onChange={handleChange}
    contextRef={someRef}
    uiSchema={uiSchema}
></JsonSchemaForm>
```

##### schema

json schema 对象，用来定义数据，同时也是我们定义表单的依据

##### value

表单的数据结果，你可以从外部改变这个 value，在表单被编辑的时候，会通过`onChange`透出 value

需要注意的是，因为 vue 使用的是可变数据，如果每次数据变化我们都去改变`value`的对象地址，那么会导致整个表单都需要重新渲染，这会导致性能降低。 从实践中来看，我们传入的对象，在内部修改其 field 的值基本不会有什么副作用，所以我们会使用这种方式来进行实现。也就是说，如果`value`是一个对象， 那么从`JsonSchemaForm`内部修改的值，并不会改变`value`对象本身。我们仍然会触发`onChange`，因为可能在表单变化之后，使用者需要进行一些操作。

##### onChange

在表单值有任何变化的时候会触发该回调方法，并把新的值进行返回

##### locale

语言，使用`ajv-i18n`指定错误信息使用的语言

##### contextRef

你需要传入一个 vue3 的`Ref`对象，我们会在这个对象上挂载`doValidate`方法，你可以通过

```jsx
const yourRef = ref({})

onMounted(() => {
  yourRef.value.doValidate()
})

<JsonSchemaForm contextRef={yourRef} />
```

这样来主动让表单进行校验。

##### uiSchema

对表单的展现进行一些定制，其类型如下：

```ts
export interface VueJsonSchemaConfig {
  title?: string
  descrription?: string
  component?: string
  additionProps?: {
    [key: string]: any
  }
  withFormItem?: boolean
  widget?: 'checkbox' | 'textarea' | 'select' | 'radio' | 'range' | string
  items?: UISchema | UISchema[]
}
export interface UISchema extends VueJsonSchemaConfig {
  properties?: {
    [property: string]: UISchema
  }
}
```

#### vue-jss

css in js库基于jss二次开发

`npm i vue-jss jss jss-preset-default`

#### monaco-editor

代码编辑器

```tsx
/* eslint no-use-before-define: 0 */

import { defineComponent, ref, onMounted, watch, onBeforeUnmount, shallowReadonly, shallowRef } from 'vue'

import * as Monaco from 'monaco-editor'

import type { PropType, Ref } from 'vue'
import { createUseStyles } from 'vue-jss'

// 返回一个方法
const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1
  }
})

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true
    },
    onChange: {
      type: Function as PropType<(value: string, event: Monaco.editor.IModelContentChangedEvent) => void>,
      required: true
    },
    title: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    // must be shallowRef, if not, editor.getValue() won't work
    const editorRef = shallowRef()

    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let __prevent_trigger_change_event = false // eslint-disable-line

    onMounted(() => {
      const editor = editorRef.value = Monaco.editor.create(containerRef.value, {
        value: props.code,
        language: 'json',
        formatOnPaste: true,
        tabSize: 2,
        minimap: {
          enabled: false,
        },
      })

      _subscription = editor.onDidChangeModelContent((event) => {
        console.log('--------->', __prevent_trigger_change_event) // eslint-disable-line
        if (!__prevent_trigger_change_event) { // eslint-disable-line
          props.onChange(editor.getValue(), event);
        }
      });
    })

    onBeforeUnmount(() => {
      if (_subscription)
        _subscription.dispose()
    })

    watch(() => props.code, (v) => {
      const editor = editorRef.value
      const model = editor.getModel()
      if (v !== model.getValue()) {
        editor.pushUndoStop();
        __prevent_trigger_change_event = true // eslint-disable-line
        // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: v,
            },
          ]
        );
        editor.pushUndoStop();
        __prevent_trigger_change_event = false // eslint-disable-line
      }
      // if (v !== editorRef.value.getValue()) {
      //   editorRef.value.setValue(v)
      // }
    })

    const classesRef = useStyles()

    return () => {

      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.title}><span>{props.title}</span></div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  }
})
```

插件：monaco-editor-webpack-plugin

```js
  const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack(config) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
}
```

### 展示项目

app.tsx

```tsx
import { defineComponent, reactive, ref, Ref, watchEffect } from "vue";
import {createUseStyles} from 'vue-jss'

import MonacoEditor from './components/MonacoEditor'
import demos from './demos'
import SchemaForm from '../lib'

// TODO：在lib中export
type Schema = any
type UISchema = any

function jsonToString(data: any) {
    return JSON.stringify(data, null, 2)
}

// 样式
const useStyles = createUseStyles({
    ...
})

export default defineComponent({
    setup() {
        // 记录当前选中的demo
        const selectedRef: Ref<number> = ref(0)

        const demo: {
            schema: Schema | null,
            data: any,
            uiSchema: UISchema | null,
            schemaCode: string,
            dataCode: string,
            uiSchemaCode: string,
        } = reactive({
            schema: null,
            data: {},
            uiSchema: {},
            schemaCode: '',
            dataCode: '',
            uiSchemaCode: '',
        })

        watchEffect(() => {
          const index = selectedRef.value
          const d = demos[index]
          demo.schema = d.schema
          demo.data = d.default
          demo.uiSchema = d.uiSchema
          demo.schemaCode = jsonToString(d.schema)
          demo.dataCode = jsonToString(d.default)
          demo.uiSchemaCode = jsonToString(d.uiSchema)
        })

        const handleChange = (v: any) => {
          demo.data = v
          demo.dataCode = jsonToString(v)
        }

        // 工厂函数
        const handleCodeChange = (
          field: 'schema' | 'data' | 'uiSchema',
          value: string
        ) => {
            let json: any
            try {
                json = JSON.parse(value)
                demo[field] = json
                ;(demo as any)[`${field}Code`] = value
            } catch (err){
                console.log(err);
            }
        }
        const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
        const handleDataChange = (v: string) => handleCodeChange('data', v)
        const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

        const classesRef = useStyles()

        return () => {
            const classes = classesRef.value
            const selected = selectedRef.value

            return (        // <StyleThemeProvider>
              // <VJSFThemeProvider theme={theme as any}>
              <div class={classes.container}>
                <div class={classes.menu}>
                  <h1>Vue3 JsonSchema Form</h1>
                  <div>
                    {demos.map((demo, index) => (
                      <button
                        class={{
                          [classes.menuButton]: true,
                          [classes.menuSelected]: index === selected,
                        }}
                        onClick={() => (selectedRef.value = index)}
                      >
                        {demo.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div class={classes.content}>
                  <div class={classes.code}>
                    <MonacoEditor
                      code={demo.schemaCode}
                      class={classes.codePanel}
                      onChange={handleSchemaChange}
                      title="Schema"
                    />
                    <div class={classes.uiAndValue}>
                      <MonacoEditor
                        code={demo.uiSchemaCode}
                        class={classes.codePanel}
                        onChange={handleUISchemaChange}
                        title="UISchema"
                      />
                      <MonacoEditor
                        code={demo.dataCode}
                        class={classes.codePanel}
                        onChange={handleDataChange}
                        title="Value"
                      />
                    </div>
                  </div>
                  <div class={classes.form}>
                    <SchemaForm
                      schema={demo.schema}
                      onChange={handleChange}
                      value={demo.data}
                    />
                    {/* <SchemaForm
                      schema={demo.schema!}
                      uiSchema={demo.uiSchema!}
                      onChange={handleChange}
                      contextRef={methodRef}
                      value={demo.data}
                    /> */}
                  </div>
                </div>
              </div>
              // </VJSFThemeProvider>
              // </StyleThemeProvider>
            )
        }
    }
})
```

### 组件开发

SchemaItem：分发不同type的schema

fields/xxxField：具体的实现

#### 简单节点的渲染

```vue
<template>
    <input type="text" :value="value" @input="handleChange" />
</template>

<script lang='ts' setup>
import {defineProps} from 'vue'

import {FieldPropsDefine, Schema} from '../types'

// 直接使用FieldPropsDefine会报错
const props = defineProps({...FieldPropsDefine})

const handleChange = (e: any) => {
    props.onChange(e.target.value)
}
</script>
```

#### 复杂节点渲染

##### 对象

不要循环引用组件，难以查找错误，使用插件提醒`npm i -D circular-dependency-plugin`

使用provide解决循环引用的问题

源码：apiInject.ts

```ts
// /packages/runtime-core/src/apiInject.ts
import { isFunction } from '@vue/shared'
import { currentInstance } from './component'
import { currentRenderingInstance } from './componentRenderUtils'
import { warn } from './warning'

export interface InjectionKey<T> extends Symbol {}

export function provide<T>(key: InjectionKey<T> | string | number, value: T) {
	// 判断是否处于组件的渲染流程，即只能在setup中使用
    if (!currentInstance) {
        if (__DEV__) {
            warn(`provide() can only be used inside setup().`)
        }
    } else {
        let provides = currentInstance.provides
        // by default an instance inherits its parent's provides object
        // but when it needs to provide values of its own, it creates its
        // own provides object using parent provides object as prototype.
        // this way in `inject` we can simply look up injections from direct
        // parent and let the prototype chain do the work.
        // 默认情况下，实例继承其父对象的Provides对象
        // 但是当需要提供自己的值时，它会使用父提供对象作为原型创建对象
        // 以这种方式，在`inject`中，我们可以直接从直接父对象查询中查找注入从而让原型链起作用
        const parentProvides =
              currentInstance.parent && currentInstance.parent.provides
        if (parentProvides === provides) {
            provides = currentInstance.provides = Object.create(parentProvides)
        }
        // TS doesn't allow symbol as index type
        provides[key as string] = value
    }
}

...
export function inject(
  key: InjectionKey<any> | string,
  defaultValue?: unknown,
  treatDefaultAsFactory = false
) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  const instance = currentInstance || currentRenderingInstance
  if (instance) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the intance is at root
    const provides =
      instance.parent == null
        ? instance.vnode.appContext && instance.vnode.appContext.provides
        : instance.parent.provides

    if (provides && (key as string | symbol) in provides) {
      // TS doesn't allow symbol as index type
      return provides[key as string]
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue()
        : defaultValue
    } else if (__DEV__) {
      warn(`injection "${String(key)}" not found.`)
    }
  } else if (__DEV__) {
    warn(`inject() can only be used inside setup() or functional components.`)
  }
}
```

##### 数组

