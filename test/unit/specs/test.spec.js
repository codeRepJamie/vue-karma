import Vue from 'vue'
import test from '@/components/test'

describe('test.vue组件加载加载后，', () => {

  function createVue(vueConfig) {
    let baseVueConfig = {
      template: `<div><test number="10"/></div>`,
      components: {test}
    }
    return (new Vue(Object.assign(baseVueConfig, vueConfig))).$mount().$children[0]
  }

  describe('测试基本功能', () => {
    let testingComponent,
      inputNumber = 20
    beforeEach(function () {
      testingComponent = createVue({
        template: `<div><test number="${inputNumber}"/></div>`
      })
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

    afterEach(() => {
      testingComponent = null;
      minNumber = 5;
      inputNumber = 20;
    })

    it('[test_0]组件属性最小值默认为0', () => {
      minNumber = 0

      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      });
      //console.log(testingComponent.minValue)
      expect(testingComponent.minValue).toEqual(minNumber)
    })

    it('[test_1]组件属性最小值应该与组件中的minalue值一致', () => {
      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      });
      expect(testingComponent.minValue).toEqual(minNumber)
    })

    it('[test_2]组件minus按钮无限点击不能够超过最小值', () => {
      let min_value

      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      });
      min_value = testingComponent.minValue

      do {
        testingComponent.$refs.minus.click()
      } while (testingComponent.value > min_value)

      testingComponent.$nextTick(function () {
        expect(this.value).toEqual(min_value)
        expect(this.$refs.minus.disabled).toBe(true)
      })
    })

    it('[test_3]输入框不能够超过最小值,如果小于它则value值等于最小值', () => {
      let set_min = 2

      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      });

      testingComponent.$refs.inputNumber.value = set_min
      testingComponent.$refs.inputNumber.dispatchEvent(new Event('input'))

      testingComponent.$nextTick(function () {
        expect(this.minValue).toBeGreaterThan(set_min)
        expect(this.minValue).toEqual(this.value)
        expect(this.$refs.minus.disabled).toBe(true)
      })

    })
  })

  describe('测试最大值功能', () => {

    let testingComponent,
      inputNumber = 20,
      maxNumber = 25;

    afterEach(() => {
      testingComponent = null;
      maxNumber = 25;
      inputNumber = 20;
    })

    it('[test_1]组件属性最大值应该与组件中的maxValue值一致', () => {
      testingComponent = createVue({
        template: `<div><test max="${maxNumber}" number="${inputNumber}"/></div>`
      });
      expect(testingComponent.maxValue).toEqual(maxNumber)
    })

    it('[test_2]组件plus按钮无限点击不能够超过最大值', () => {
      testingComponent = createVue({
        template: `<div><test max="${maxNumber}" number="${inputNumber}"/></div>`
      });

      do {
        testingComponent.$refs.plus.click()
        console.log(testingComponent.value, testingComponent.maxValue);
      } while (testingComponent.value < maxNumber)

      testingComponent.$nextTick(function () {
        expect(this.value).toEqual(maxNumber)
        expect(this.$refs.plus.disabled).toBe(true)
      })
    })

  })

})
