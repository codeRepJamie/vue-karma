import Vue from 'vue'
import test from '@/components/test'

describe('test.vue组件加载加载后，', () => {

  function createVue (vueConfig) {
    let baseVueConfig = {
      template: `<div><test number="10"/></div>`,
      components: {test}
    }
    return (new Vue(Object.assign(baseVueConfig, vueConfig))).$mount()
  }

  describe('测试基本功能', () => {
    let testingComponent,
      inputNumber = 20
    beforeEach(function () {
      testingComponent = createVue({
        template: `<div><test number="${inputNumber}"/></div>`
      }).$children[0]
    })

    afterEach(function () {
      testingComponent.$refs.inputNumber.value = inputNumber
      testingComponent.$refs.inputNumber.dispatchEvent(new Event('input'))
    })
    it('[test_1_1]组件属性value的值应该与组件中的value值一致', () => {
      expect(testingComponent.value).toEqual(inputNumber)
    })

    it('[test_2]组件minus/plus按钮点击后,value会相应+1/-1', () => {
      let old_value = testingComponent.value
      testingComponent.$refs.minus.click()
      expect(old_value - 1).toEqual(testingComponent.value)
      old_value = testingComponent.value
      testingComponent.$refs.plus.click()
      expect(old_value + 1).toEqual(testingComponent.value)
    })
  })

  describe('测试最小值功能', () => {

    let testingComponent,
      inputNumber = 20,
      minNumber = 5

    beforeAll(function () {
      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      }).$children[0]
    })

    it('[test_1]组件属性最小值应该与组件中的minalue值一致', () => {
      expect(testingComponent.minValue).toEqual(minNumber)
    })

    it('[test_2]组件minus按钮无限点击不能够超过最小值', () => {
      let min_value = testingComponent.minValue

      do {
        testingComponent.$refs.minus.click()
      } while (testingComponent.value > min_value)

      expect(testingComponent.value).toEqual(min_value)
    })

    it('[test_3]输入框不能够超过最小值,如果小于它则value值等于最小值', () => {
      let set_min = 2
      testingComponent.$refs.inputNumber.value = set_min
      testingComponent.$refs.inputNumber.dispatchEvent(new Event('input'))
      console.log(testingComponent.value);
      setTimeout(function () {
        console.log(testingComponent.value);
      },0)
      expect(testingComponent.minValue).toBeGreaterThan(set_min)
      expect(testingComponent.minValue).toEqual(testingComponent.value)

    })
  })
})
