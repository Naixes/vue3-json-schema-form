import { defineComponent, reactive, ref, Ref, watchEffect } from "vue";
import {createUseStyles} from 'vue-jss'

import MonacoEditor from './components/MonacoEditor'
import demos from './demos'
import SchemaForm, { ThemeProvider } from '../lib'
import themeDefault from '../lib/theme-default/index'

// TODO：在lib中export
type Schema = any
type UISchema = any

function jsonToString(data: any) {
    return JSON.stringify(data, null, 2)
}

// 样式
const useStyles = createUseStyles({
    container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '1200px',
		margin: '0 auto',
    },
    menu: {
      	marginBottom: 20,
    },
    code: {
		width: 700,
		flexShrink: 0,
    },
    codePanel: {
		minHeight: 400,
		marginBottom: 20,
    },
    uiAndValue: {
		display: 'flex',
		justifyContent: 'space-between',
		'& > *': {
			width: '46%',
		},
    },
    content: {
      	display: 'flex',
    },
    form: {
		padding: '0 20px',
		flexGrow: 1,
    },
    menuButton: {
      	appearance: 'none',
		borderWidth: 0,
		backgroundColor: 'transparent',
		cursor: 'pointer',
		display: 'inline-block',
		padding: 15,
		borderRadius: 5,
		'&:hover': {
			background: '#efefef',
		},
    },
    menuSelected: {
		background: '#337ab7',
		color: '#fff',
		'&:hover': {
			background: '#337ab7',
		},
	},
})

export default defineComponent({
    setup() {
        // 记录当前选中的demo
        const selectedRef: Ref<number> = ref(0)

        const demo: {
            schema: Schema | null,
            data: any,
            uiSchema: UISchema | null,
            schemaCode: string,
            dataCode: string,
            uiSchemaCode: string,
        } = reactive({
            schema: null,
            data: {},
            uiSchema: {},
            schemaCode: '',
            dataCode: '',
            uiSchemaCode: '',
        })

        watchEffect(() => {
          const index = selectedRef.value
          const d = demos[index]
          demo.schema = d.schema
          demo.data = d.default
          demo.uiSchema = d.uiSchema
          demo.schemaCode = jsonToString(d.schema)
          demo.dataCode = jsonToString(d.default)
          demo.uiSchemaCode = jsonToString(d.uiSchema)
        })

        const handleChange = (v: any) => {
          demo.data = v
          demo.dataCode = jsonToString(v)
        }

        // 工厂函数
        const handleCodeChange = (
          field: 'schema' | 'data' | 'uiSchema',
          value: string
        ) => {
            let json: any
            try {
                json = JSON.parse(value)
                demo[field] = json
                ;(demo as any)[`${field}Code`] = value
            } catch (err){
                console.log(err);
            }
        }
        const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
        const handleDataChange = (v: string) => handleCodeChange('data', v)
        const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

        const classesRef = useStyles()

        return () => {
            const classes = classesRef.value
            const selected = selectedRef.value

            return (        // <StyleThemeProvider>
              // <VJSFThemeProvider theme={theme as any}>
              <div class={classes.container}>
                <div class={classes.menu}>
                  <h1>Vue3 JsonSchema Form</h1>
                  <div>
                    {demos.map((demo, index) => (
                      <button
                        class={{
                          [classes.menuButton]: true,
                          [classes.menuSelected]: index === selected,
                        }}
                        onClick={() => (selectedRef.value = index)}
                      >
                        {demo.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div class={classes.content}>
                  <div class={classes.code}>
                    <MonacoEditor
                      code={demo.schemaCode}
                      class={classes.codePanel}
                      onChange={handleSchemaChange}
                      title="Schema"
                    />
                    <div class={classes.uiAndValue}>
                      <MonacoEditor
                        code={demo.uiSchemaCode}
                        class={classes.codePanel}
                        onChange={handleUISchemaChange}
                        title="UISchema"
                      />
                      <MonacoEditor
                        code={demo.dataCode}
                        class={classes.codePanel}
                        onChange={handleDataChange}
                        title="Value"
                      />
                    </div>
                  </div>
                  <div class={classes.form}>
                    {/* TODO：解决类型问题 */}
                    {/* 类型不兼容，改了很多，都是同一个类型定义，不知道问题在哪 */}
                    <ThemeProvider theme={themeDefault as any}>
                      <SchemaForm
                        // 已改为从theme.tsx的ThemeProvider中获取
                        // theme={themeDefault as any}
                        schema={demo.schema}
                        onChange={handleChange}
                        value={demo.data}
                      />
                    </ThemeProvider>
                    {/* <SchemaForm
                      schema={demo.schema!}
                      uiSchema={demo.uiSchema!}
                      onChange={handleChange}
                      contextRef={methodRef}
                      value={demo.data}
                    /> */}
                  </div>
                </div>
              </div>
              // </VJSFThemeProvider>
              // </StyleThemeProvider>
            )
        }
    }
})
