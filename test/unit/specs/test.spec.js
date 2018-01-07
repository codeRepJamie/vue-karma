import Vue from 'vue'
import test from '@/components/test'

document.body.innerHTML = '<div id="app"></div>';
let inputNumber = 10,
  template,
  vmTest,
  testingComponent,
  vueConfig
;

describe('test.vue组件加载加载后，', () => {

  beforeEach(function () {
    console.log(vueConfig);
    vmTest = new Vue(Object.assign(vueConfig, {
      el: '#app',
      template: `<div><test number="${inputNumber}"/></div>`,
      components: {test}
    })).$mount()
    testingComponent = vmTest.$children[0];
  });

  describe('测试基本功能', () => {
    template = `<div><test number="${inputNumber}"/></div>`

    beforeEach(function () {
      vueConfig = {
        template: template
      };
    });

    afterEach(function () {
      template = `<div><test number="${inputNumber}"/></div>`
      testingComponent.$refs.inputNumber.value = 10;
      testingComponent.$refs.inputNumber.dispatchEvent(new Event('input'));
    });
    it('[test_1_1]组件属性value的值应该与组件中的value值一致', () => {
      expect(testingComponent.value).toEqual(inputNumber);
    });
    it('[test_1_2]组件属性min的值应该与组件中的min值一致', () => {
      let min = 20;
      template = `<div><test min="${min}" number="${inputNumber}"/></div>`
      /*vmTest = new Vue({
        template: `<div><test min="${min}" number="${inputNumber}"/></div>`,
        components: {test}
      }).$mount()
      testingComponent = vmTest.$children[0];*/
      expect(testingComponent._min).toEqual(min);
    });

    it('[test_3]组件minus/plus按钮点击后,value会相应+1/-1', () => {
      let old_value = testingComponent.value;
      testingComponent.$refs.minus.click();
      expect(testingComponent.value).toEqual(old_value - 1);
      old_value = testingComponent.value;
      testingComponent.$refs.plus.click();
      expect(testingComponent.value).toEqual(old_value + 1);
    });
    it('[test_4]组件minus按钮无限点击不能够超过最小值', () => {
      let min_value = testingComponent._min
      ;

      do {
        testingComponent.$refs.minus.click();
      } while (testingComponent.value > min_value)

      expect(testingComponent.value).toEqual(testingComponent._min);
    });
  });


  it('[test_2]组件input输入框的value值应该与组件中的value值一致', () => {
    let testingNumber = 200

    testingComponent.$refs.inputNumber.value = testingNumber;
    testingComponent.$refs.inputNumber.dispatchEvent(new Event('input'));
    expect(testingNumber).toEqual(testingComponent.value);
  });
})
