// or ESM/TypeScript import
// import Ajv from "ajv"
// Node.js require:
const Ajv = require("ajv").default
const addFormats = require("ajv-formats")
const localize = require('ajv-i18n');

// 简单的
let schema = {
    type: 'string',
    minLength: 10,
}
// 复杂一点的
schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 10,
        },
        age: {
            type: 'number',
        },
        pets: {
            type: 'array',
            // 第一种定义方式
            // items: {
            //     type: 'string',
            // },
            // 第二种
            items: [
                { type: 'string', },
                { type: 'number', }
            ]
        },
        email: {
            type: 'string',
            format: 'email',
        },
        testFormatProperty: {
            type: 'string',
            format: 'testFormat',
        },
        testKeywordProperty: {
            type: 'string',
            testKeyword: 'testKeyword',
            // ajv-errors提供
            // 任何一条规则错误都只会显示这个错误信息
            // errorMessage: '你又错了！',
            // 区分关键字设置错误信息
            errorMessage: {
                type: '你传的不是字符串！',
                testKeyword: '你猜猜你又错哪了！'
            },
        }
    },
    required: ['name', 'age'],
}

let data = 'naixes'
data = {
    name: 'naixes',
    age: 18,
    pets: ['egg core', 2],
    testFormatProperty: 'testFormat',
    testKeywordProperty: 'hello!',
}

// 要使用ajv-errors需要传入{allErrors: true}
const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {allErrors: true}
// 版本7以上 formats 需要单独安装插件
addFormats(ajv)

// 引入ajv-errors库
require('ajv-errors')(ajv)

// 自定义format
ajv.addFormat('testFormat', (data) => {
    return data === 'testFormat'
})

// 自定义关键字
ajv.addKeyword({
    keyword: 'testKeyword',

    // 方法1：validate时调用
    // validate: xx = (schema, data) => {
    //     console.log('schema', schema, 'data', data);
    //     // 自定义错误信息，也可以使用库自定义错误信息
    //     xx.errors = [
    //         {
    //             keyword: 'testKeyword',
    //             dataPath: '/testKeywordProperty',
    //             schemaPath: '#/properties/testKeywordProperty/testKeyword',
    //             params: {},
    //             message: '你错了！'
    //         }
    //     ]
    //     return data.length === 3
    // },

    // 方法2：compile时调用
    // compile: (sch, parentSchema) => {
    //     console.log('sch', sch, 'parentSchema', parentSchema);
    //     // 要返回一个函数
    //     return () => true 
    // },
    // // 这个keyword接收的值的schema
    // metaSchema: {},

    // 方法3：相当于组合多个schema
    macro: (sch, parentSchema) => {
        // console.log('sch', sch, 'parentSchema', parentSchema);
        // 要返回一个schema
        return {
            minLength: 10,
        }
    },
    metaSchema: {},

    // 会覆盖方法1中自定义的错误信息
    errors: false,
})

const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) {
    localize.zh(validate.errors)
    console.log(validate.errors)
}