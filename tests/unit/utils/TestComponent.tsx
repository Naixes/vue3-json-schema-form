import { defineComponent, PropType } from "vue";

import SchemaForm, { Schema, ThemeProvider } from "../../../lib";
import defaultTheme from "../../../lib/theme-default";

// ThemeProvider封装的优势提现：

// theme包：vjsf-theme-default
// core包：vue3-jsonschema-form

// 在vjsf-theme-default中：
// import {ThemeProvider} from 'vue3-jsonschema-form'，打包时剔除掉，在最终使用到这两个库的项目中才会合并打包
// 导出组件 ThemeDefaultProvider ，就可以不用再使用的时候导入多余的内容也不需要传递 theme 只要导入ThemeDefaultProvider组件就可以
// 依赖于core的主题插件等都可以通过扩充provider来提供给用户最终使用的方便的api
export const ThemeDefaultProvider = defineComponent({
    setup(props, {slots}) {
        return () => (
            <ThemeProvider theme={defaultTheme as any}>
                {slots.default && slots.default()}
            </ThemeProvider>
        )
    }
})

export default defineComponent({
    name: 'TestComponent',
    props: {
        schema: {
            type: Object as PropType<Schema>,
            required: true,
        },
        value: {
            required: true,
        },
        onChange: {
            type: Function as PropType<(v: any) => void>,
            required: true,
        },
    },
    setup(props) {
        return () => {
            return (
                <ThemeDefaultProvider>
                    <SchemaForm {...props}></SchemaForm>
                </ThemeDefaultProvider>
            )
        }
    }
})