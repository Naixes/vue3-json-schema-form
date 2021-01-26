import { inject } from "vue"

import { CommonFieldType } from "./types"

// 存储所有的 provide key
export const SchemaFormContextKey = Symbol()

// 获取SchemaForm提供的SchemaItem
export function useVJSFContext() {
    // theme已改为从theme.tsx中获取
    // const context: {theme: Theme, SchemaItem: CommonFieldType} | undefined = inject(SchemaFormContextKey)
    const context: {SchemaItem: CommonFieldType} | undefined = inject(SchemaFormContextKey)
    
    if(!context) {
        throw Error('SchemaForm shuold bu used')
    }
    
    return context
}