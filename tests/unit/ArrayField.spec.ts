import { mount } from "@vue/test-utils";

import { NumberField, StringField, ArrayField, SelectionWidget } from "../../lib";
import TestSchemaForm from './utils/TestComponent'

describe("ArrayField", () => {
    beforeEach(() => {
    })

    // 单一类型数组
    it("renders multi type fields", async() => {
        const wrapper = mount(TestSchemaForm, {
        props: { 
            schema: {
                type: 'array',
                items: [
                    {type: 'string'},
                    {type: 'number'}
                ]
            },
            value: [],
            onChange: () => {}
        }
        });

        const arrField = wrapper.findComponent(ArrayField)
        const strField = arrField.findComponent(StringField)
        const numField = arrField.findComponent(NumberField)
        // 渲染组件
        expect(strField.exists()).toBeTruthy()
        expect(numField.exists()).toBeTruthy()
    });

    // 固定长度数组
    it("renders single type fields", async() => {
        const wrapper = mount(TestSchemaForm, {
        props: { 
            schema: {
                type: 'array',
                items: {type: 'string'},
            },
            value: ['1', '2'],
            onChange: () => {}
        }
        });

        const arrField = wrapper.findComponent(ArrayField)
        const strFields = arrField.findAllComponents(StringField)
        // 渲染固定数量的组件
        expect(strFields.length).toBe(2)
        // 判断每个组件的value
        expect(strFields[0].props('value')).toBe('1')
        expect(strFields[1].props('value')).toBe('2')
    });

    // 包含列表项数组
    it("renders option type fields", async() => {
        const wrapper = mount(TestSchemaForm, {
        props: { 
            schema: {
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['1', '2', '3']
                },
            },
            value: [],
            onChange: () => {}
        }
        });

        const arrField = wrapper.findComponent(ArrayField)
        const optFields = arrField.findComponent(SelectionWidget)
        // 渲染组件
        expect(optFields.exists()).toBeTruthy()
    });
});
