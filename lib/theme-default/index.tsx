import SelectionWidget from './Selection'

// 临时创建的CommonWidge解决ts定义问题
import { defineComponent } from 'vue'
import {CommonWidgetPropsDefine, CommonWidgetType} from '../types'

const CommonWidge: CommonWidgetType = defineComponent({
    props: CommonWidgetPropsDefine,
    setup() {
        return () => null
    }
})

export default {
    widgets: {
        SelectionWidget,
        TextWedget: CommonWidge,
        NumberWedget: CommonWidge,

    }
}