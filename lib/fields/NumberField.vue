<template>
    <input type="number" :value="value" @input="handleChange" />
</template>

<script lang='ts' setup>
import {defineProps} from 'vue'

import {FieldPropsDefine, Schema} from '../types'

// 直接使用FieldPropsDefine会报错
const props = defineProps({...FieldPropsDefine})

const handleChange = (e: any) => {
    // 返回的值是一个字符串
    const value = e.target.value
    const num = Number(value)
    if(Number.isNaN(num)) {
        props.onChange(undefined)
    }else {
        props.onChange(num)
    }
}
</script>