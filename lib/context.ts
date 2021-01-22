import { inject } from "vue"

import { CommonFieldType } from "./types"

// 存储所有的 provide key
export const SchemaFormContextKey = Symbol()

// 获取SchemaForm提供的SchemaItem
export function useVJSFContext() {
    const context: {SchemaItem: CommonFieldType} | undefined = inject(SchemaFormContextKey)
    
    if(!context) {
        throw Error('SchemaForm shuold bu used')
    }
    
    return context
}