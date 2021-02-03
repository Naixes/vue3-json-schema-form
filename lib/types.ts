// 共用代码，可以在theme-default和core中通用

import { DefineComponent, PropType } from "vue"
import {FormatDefinition} from 'ajv'
import { ErrorSchema } from "./validator"

export enum SchemaTypes {
    'NUMBER' = 'number',
    'INTEGER' = 'integer',
    'STRING' = 'string',
    'OBJECT' = 'object',
    'ARRAY' = 'array',
    'BOOLEAN' = 'boolean',
  }
  
  type SchemaRef = { $ref: string }
  
  // type Schema = any
  export interface Schema {
    type?: SchemaTypes | string
    const?: any
    format?: string
  
    title?: string
    default?: any
  
    properties?: {
      [key: string]: Schema
    }
    items?: Schema | Schema[] | SchemaRef
    uniqueItems?: any
    dependencies?: {
      [key: string]: string[] | Schema | SchemaRef
    }
    oneOf?: Schema[]
    anyOf?: Schema[]
    allOf?: Schema[]
    // TODO: uiSchema
    // vjsf?: VueJsonSchemaConfig
    required?: string[]
    enum?: any[]
    enumNames?: any[]
    enumKeyValue?: any[]
    additionalProperties?: any
    additionalItems?: Schema
  
    minLength?: number
    maxLength?: number
    minimun?: number
    maximum?: number
    multipleOf?: number
    exclusiveMaximum?: number
    exclusiveMinimum?: number
  }

export const FieldPropsDefine = {
    schema: {
        type: Object as PropType<Schema>,
        required: true,
    },
    value: {
        required: true,
    },
    onChange: {
        type: Function as PropType<(v: any) => void>,
        required: true,
    },
    rootSchema: {
        type: Object as PropType<Schema>,
        required: true,
    },
    errorSchema: {
        type: Object as PropType<ErrorSchema>,
        required: true
    },
    uiSchema: {
        type: Object as PropType<UISchema>,
        required: true
    }
} as const

// 借助ExtractPropTypes可以将对象转换成类型，源码中已经加过了
export type CommonFieldType = DefineComponent<typeof FieldPropsDefine>

export const CommonWidgetPropsDefine = {
    value: {},
    onChange: {
        type: Function as PropType<(v: any) => void>,
        required: true
    },
    errors: {
        type: Array as PropType<string[]>,
    },
    schema: {
        type: Object as PropType<Schema>,
        required: true
    },
    options: {
      type: Object as PropType<{[key: string]: any}>
    }
} as const

// 如果返回类型里面有很多any，是由于重载过多，可以试试以下写法
// defineComponent返回的类型十分复杂，是因为没有舍弃老的通过options声明组件的方式
// export type CommonWidgetType = DefineComponent<typeof FieldPropsDefine, {}, {}>
export type CommonWidgetType = DefineComponent<typeof CommonWidgetPropsDefine>

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
      type: Array as PropType<{
          key: string,
          value: any
      }[]>,
      required: true
  },
} as const
export type SelectionWidgetType = DefineComponent<typeof SelectionWidgetPropsDefine>

// 主题相关

export enum SelectionWidgetNames {
  SelectionWidget = 'SelectionWidget'
}
export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget'
}

// 主题定义
export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionWidgetType,
    [CommonWidgetNames.TextWidget]: CommonWidgetType,
    [CommonWidgetNames.NumberWidget]: CommonWidgetType,
  }
}

// 自定义组件
export type UISchema = {
  widget?: string | CommonWidgetType,
  properties?: {
    [key: string]: UISchema
  },
  items?: UISchema | UISchema[],
} & {
  // 可以传递其他任意属性
  [key: string]: any
}

// 自定义format
export interface CustomFormat {
  name: string,
  definition: FormatDefinition<string>,
  component: CommonWidgetType,
}