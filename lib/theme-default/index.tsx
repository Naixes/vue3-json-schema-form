import SelectionWidget from './SelectionWidget'
import TextWidget from './TextWidget'
import NumberWidget from './NumberWidget'

// 临时创建的CommonWidge解决ts定义问题
// import { defineComponent } from 'vue'
// import {CommonWidgetPropsDefine, CommonWidgetType} from '../types'

// const CommonWidge: CommonWidgetType = defineComponent({
//     props: CommonWidgetPropsDefine,
//     setup() {
//         return () => null
//     }
// })

export default {
    widgets: {
        SelectionWidget,
        TextWidget,
        NumberWidget,
    }
}