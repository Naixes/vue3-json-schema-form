import Ajv, {ErrorObject} from 'ajv'
import toPath from 'lodash.topath'
// ajv-i18n没有types库
const i18n = require('ajv-i18n') // eslint-disable-line

import { Schema } from './types'

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
    return {
      name: keyword,
      property: `${dataPath}`,
      message,
      params,
      schemaPath,
    }
  })
}

export function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale = 'zh',
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

  return {
    errors,
    errorSchema,
    valid: errors.length === 0,
  }
}