import { mount } from "@vue/test-utils";

import JsonSchemaForm, { NumberField, StringField, ObjectField } from "../../lib";

describe("ObjectField", () => {
    let schema: any
    beforeEach(() => {
        schema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                },
                age: {
                    type: 'number',
                },
            }
        }
    })

    // 能渲染出StringField和NumberField
    it("renders properties to correct field", async() => {
        const wrapper = mount(JsonSchemaForm, {
        props: { 
            schema,
            value: {},
            onChange: () => {}
        }
        });

        const objField = wrapper.findComponent(ObjectField)
        const strField = objField.findComponent(StringField)
        const numField = objField.findComponent(NumberField)
        // 渲染组件
        expect(strField.exists()).toBeTruthy()
        expect(numField.exists()).toBeTruthy()
    });
    // 子组件value改变时改变value
    it("should change value when sub field trigger onChange", async() => {
        let value: any = {}
        const wrapper = mount(JsonSchemaForm, {
        props: { 
            schema,
            value: value,
            onChange: (v) => {value = v}
        }
        });

        const objField = wrapper.findComponent(ObjectField)
        const strField = objField.findComponent(StringField)
        const numField = objField.findComponent(NumberField)
        // 触发子组件onChange事件
        await strField.props('onChange')('1')
        expect(value.name).toEqual('1')
        await numField.props('onChange')(1)
        expect(value.age).toEqual(1)
    });
    // 子组件value改变为undefined时删除该属性
    it("should change value to undefined when sub field trigger onChange with undefined", async() => {
        let value: any = {
            name: 'sin'
        }
        const wrapper = mount(JsonSchemaForm, {
        props: { 
            schema,
            value: value,
            onChange: (v) => {value = v}
        }
        });

        const objField = wrapper.findComponent(ObjectField)
        const strField = objField.findComponent(StringField)
        // const numField = objField.findComponent(NumberField)
        // 触发子组件onChange事件并传入undefined
        expect(value.name).toEqual('sin')
        await strField.props('onChange')(undefined)
        expect(value.name).toBeUndefined()
        // await numField.props('onChange')(1)
        // expect(value.age).toEqual(1)
    });
});
