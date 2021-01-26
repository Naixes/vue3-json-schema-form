import { mount } from "@vue/test-utils";

import { NumberField } from "../../lib";
import TestSchemaForm from './utils/TestComponent'

describe("NumberField", () => {
  it("renders correct number field", async() => {
    let value = ''
    const wrapper = mount(TestSchemaForm, {
      props: { 
        schema: {
          type: 'number'
        },
        value: value,
        onChange: (v) => {value = v}
       }
    });

    const numberField = wrapper.findComponent(NumberField)
    // 渲染组件
    expect(numberField.exists()).toBeTruthy()
    
    // 触发input的input事件，value会改变
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    // number input 会自动转换类型
    expect(value).toBe(123)
  });
});
