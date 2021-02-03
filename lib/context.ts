import { inject, Ref } from "vue"

import { CommonFieldType, CommonWidgetType } from "./types"

// 存储所有的 provide key
export const SchemaFormContextKey = Symbol()

// 获取SchemaForm提供的SchemaItem
export function useVJSFContext() {
    // theme已改为从theme.tsx中获取
    // const context: {theme: Theme, SchemaItem: CommonFieldType} | undefined = inject(SchemaFormContextKey)
    const context: {
        SchemaItem: CommonFieldType,
        // 这个定义会报错因为响应式对象中的ref会被解包
        // formatMapRef: Ref<{[key: string]: CommonWidgetType}>
        formatMapRef: {[key: string]: CommonWidgetType}
    } | undefined = inject(SchemaFormContextKey)
    
    if(!context) {
        throw Error('SchemaForm shuold bu used')
    }
    
    return context
}