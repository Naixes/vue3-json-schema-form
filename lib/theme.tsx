import { computed, ComputedRef, defineComponent, inject, PropType, provide, ref, Ref } from "vue";

import {Theme, SelectionWidgetNames, CommonWidgetNames, UISchema, CommonWidgetType} from './types'
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

export function getWidgetRef<T extends SelectionWidgetNames | CommonWidgetNames>(name: T, uiSchema?: UISchema) {
    if(uiSchema?.widget && isObject(uiSchema.widget)) {
        return ref(uiSchema.widget as CommonWidgetType)
    }

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