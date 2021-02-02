export default {
    name: 'Demo',
    // schema: {
    //     title: 'name',
    //     type: 'string',
    // },
    // 测试自定义校验
    schema: {
        title: 'name',
        type: 'object',
        properties: {
            pass1: {
                title: 'pass1',
                type: 'string',
                minLength: 10,
            },
            pass2: {
                title: 'pass2',
                type: 'string',
            },
        },
    },
    customValidate(data: any, errors: any) {
        if(data.pass1 !== data.pass2) {
            errors.pass2.addError('密码必须相同')
        }
    },
    uiSchema: {},
    // default: 'naixes'
    default: 1
}