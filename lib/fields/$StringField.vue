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