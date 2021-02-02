import { defineComponent } from "vue";
import { createUseStyles } from "vue-jss";
import { CommonWidgetPropsDefine } from "../types";

const useStyles = createUseStyles({
    container: {},
    label: {
      display: 'block',
      color: '#777',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      margin: '5px 0',
      padding: 0,
      paddingLeft: 20,
    },
})

// 渲染label和错误信息
const FormItem =  defineComponent({
    name: 'FormItem',
    props: CommonWidgetPropsDefine,
    setup(props, {slots}) {
        const classesRef = useStyles()
        return () => {
            const {schema, errors} = props
            const classes = classesRef.value
            return (<div class={classes.container}>
                <label class={classes.label}>{schema.title}</label>
                {slots.default && slots.default()}
                <ul class={classes.errorText}>
                    {errors?.map(err => <li>{err}</li>)}
                </ul>
            </div>)
        }
    }
})

export default FormItem

export function withFormItem(Widget: any) {
    return defineComponent({
        name: `Wrappered${Widget.name}`,
        props: CommonWidgetPropsDefine,
        setup(props, {attrs}) {
            return () => {
                return <FormItem {...props}>
                    {/* 兼容selectWidget */}
                    <Widget {...props} {...attrs}></Widget>
                </FormItem>
            }
        }
    // }) as CommonWidgetType
    // 兼容selectWidget
    }) as any
}