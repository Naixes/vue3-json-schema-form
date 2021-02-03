import { computed, ComputedRef, defineComponent, ExtractPropTypes, inject, PropType, provide, reactive, ref, Ref } from "vue";
import { useVJSFContext } from "./context";
import SchemaForm from "./SchemaForm";

import {Theme, SelectionWidgetNames, CommonWidgetNames, FieldPropsDefine, CommonWidgetType} from './types'
import { isObject } from "./utils";

const THEME_PROVIDER_KEY = Symbol()

// 解耦theme-default和SchemaForm
const ThemeProvider = defineComponent({
    name: 'ThemeProvider',
    props: {
        theme: {
            type: Object as PropType<Theme>,
            required: true,
        }
    },
    setup(props, {slots}) {
        // computed返回ComputedRef（和Ref同类型）
        const contextRef = computed(() => props.theme)
        provide(THEME_PROVIDER_KEY, contextRef)
        return () => {
            return (
                // slots.default是一个函数
                // 如果在vue2中返回一个数组只会渲染第一个（因为只允许一个根节点），vue3在这里是一个提升
                slots.default && slots.default()
            )
        }
    }
})

export function getWidgetRef<T extends SelectionWidgetNames | CommonWidgetNames>(
    name: T,
    props?: ExtractPropTypes<typeof FieldPropsDefine>
) {
    // 获取context
    const formContext = useVJSFContext()

    if(props) {
        // 返回自定义uiSchema的widget
        const {uiSchema, schema} = props
        if(uiSchema?.widget && isObject(uiSchema.widget)) {
            return ref(uiSchema.widget as CommonWidgetType)
        }
        // 返回自定义format
        if(schema.format) {
            // // 这里formContext还有value
            // console.log('formContext', formContext);
            // // 响应化obj中的ref会被解包
            // console.log('formatMapRef', formContext['formatMapRef']);
            // 测试
            // const a = ref(0)
            // const obj = reactive({a})
            // const obj2 = {a}
            // console.log('obj.a', obj.a);
            // console.log('obj2.a', obj2.a);
            
            
            if(formContext.formatMapRef[schema.format]) {
                return ref(formContext.formatMapRef[schema.format])
            }
        }
    }

    // 返回默认widget
    const contextRef: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)
    
    if(!contextRef) {
        throw new Error('vjsf theme required')
    }
    const widgetRef = computed(() => {
        return contextRef.value.widgets[name]
    })
    return widgetRef
}

export default ThemeProvider