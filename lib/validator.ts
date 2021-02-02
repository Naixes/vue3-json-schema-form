import Ajv, {ErrorObject} from 'ajv'
import toPath from 'lodash.topath'
// ajv-i18n没有types库
const i18n = require('ajv-i18n') // eslint-disable-line

import { Schema } from './types'
import { isObject } from './utils'

interface TransformedErrorObject {
  name: string
  property: string
  message: string | undefined
  params: Record<string, any>
  schemaPath: string
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[]
}
function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 1) return {}

  return errors.reduce((errorSchema, error) => {
    console.log('error', error);
    const { property, message } = error
    const path = toPath(property) // /obj/a -> [obj, a]
    console.log('path0', path);
    let parent = errorSchema
    console.log('parent0', parent);

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    // {
    //   obj: {
    //     a: {}
    //   }
    // } // /obj/a  [obj, a]
    for (const segment of path.slice(0)) {
      console.log('segment', segment);
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
      console.log('path', path);
      console.log('parent', parent);
    }
    console.log('path1', path);
    console.log('parent1', parent);

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}

function transformErrors(
  errors: ErrorObject[] | null | undefined,
): TransformedErrorObject[] {
  if (errors === null || errors === undefined) return []

  return errors.map(({ message, dataPath, keyword, params, schemaPath }) => {
    // 将/xxx改为xxx，否则toPath不能识别
    const pathStr = dataPath ? dataPath.split('/')[1] : dataPath
    
    return {
      name: keyword,
      property: `${pathStr}`,
      message,
      params,
      schemaPath,
    }
  })
}

export async function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale = 'zh',
  customValidate?: (data: any, errors: any) => void,
) {
  let validationError = null
  // 校验
  try {
    validator.validate(schema, formData)
  } catch (err) {
    validationError = err
  }

  i18n[locale](validator.errors)
  // 错误转换
  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message,
      } as TransformedErrorObject,
    ]
  }

  const errorSchema = toErrorSchema(errors)

  if(!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0,
    }
  }

  // 自定义校验
  /**
   * {
   *  obj: {
   *    a: { b: string},
   *    __errors: []
   *  }
   * }
   */
  const proxy = createErrorProxy()
  await customValidate(formData, proxy)
  // 将proxy和现有的errorSchema进行合并
  const newErrorSchema = mergeObjects(errorSchema, proxy, true)
  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0,
  }
}

// 使用Proxy增加拦截addError存储__errors信息
// Proxy（代理器） 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming）
// reciver：总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例
function createErrorProxy() {
  const raw = {}
  return new Proxy(raw, {
    // errors.xxx.addError('ddd')
    get(target, key, reciver) {
      // 拦截addError存储__errors信息
      if(key === 'addError') {
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', reciver)
          if(__errors && Array.isArray(__errors)) {
            __errors.push(msg)
          }else {
            (target as any).__errors = [msg]
          }
        }
      }

      // 获取其他属性（子key），row.obj.a，给子key创建代理
      const res = Reflect.get(target, key, reciver)
      if(res === undefined) {
        const p: any = createErrorProxy()
        ;(target as any)[key] = p
        // 不能直接返回res[key]会又进入get造成循环
        return p
      }
      return res
    }
  })
}

// 合并对象
export function mergeObjects(obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects.
  const acc = Object.assign({}, obj1) // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key]
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays)
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}