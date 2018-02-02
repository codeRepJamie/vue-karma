import Vue from 'vue'
import test from '@/components/test'

describe('test.vue组件加载加载后，', () => {

  function createVue (vueConfig) {
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

    it('[test_1_1]组件属性value的值应该与组件中的value值一致', () => {
      testingComponent.$refs.inputNumber.value = inputNumber
      testingComponent.$refs.inputNumber.dispatchEvent(new Event('input'))
      expect(testingComponent.value).toEqual(inputNumber)
      expect(testingComponent.value.toString()).toEqual(testingComponent.$refs.inputNumber.value)
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
      testingComponent = null
      minNumber = 5
      inputNumber = 20
    })

    it('[test_0]组件属性最小值默认为0', () => {
      minNumber = 0

      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      })
      //console.log(testingComponent.minValue)
      expect(testingComponent.minValue).toEqual(minNumber)
    })

    it('[test_1]组件属性最小值应该与组件中的minalue值一致', () => {
      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      })
      expect(testingComponent.minValue).toEqual(minNumber)
    })

    it('[test_2]组件minus按钮无限点击不能够超过最小值', () => {
      let min_value

      //jasmine.clock().install();
      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      })
      min_value = testingComponent.minValue

      do {
        testingComponent.$refs.minus.click()
      } while (testingComponent.value > min_value)

      testingComponent.$nextTick(() => {
        //console.log('min ' + testingComponent.$refs.minus.disabled)
        expect(testingComponent.value).toEqual(min_value)
        expect(testingComponent.$refs.minus.disabled).toBe(true)
      })

      //jasmine.clock().tick(1000);
      //jasmine.clock().uninstall();
    })

    it('[test_3]输入框不能够超过最小值,如果小于它则value值等于最小值', () => {
      let set_min = 2

      testingComponent = createVue({
        template: `<div><test min="${minNumber}" number="${inputNumber}"/></div>`
      })

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
      maxNumber = 25

    afterEach(() => {
      testingComponent = null
      maxNumber = 25
      inputNumber = 20
    })

    beforeEach(() => {
      document.body.innerHTML = '<div id="example"></div>'
      testingComponent = createVue({
        el: '#example',
        template: `<div><test max="${maxNumber}" number="${inputNumber}"/></div>`
      })
    })

    it('[test_1]组件属性最大值应该与组件中的maxValue值一致', () => {
      expect(testingComponent.maxValue).toEqual(maxNumber)
    })

    it('[test_2]组件plus按钮无限点击不能够超过最大值', done => {
      do {
        testingComponent.$refs.plus.click()
      } while (testingComponent.value < maxNumber)

      testingComponent.$nextTick(() => {
        expect(testingComponent.value).toEqual(maxNumber)
        expect(testingComponent.$refs.plus.disabled).toBe(true)
        done()
      })

    })

    it('[test_3]输入框不能够超过最大值,如果大于它则value值等于最大值', done => {
      let set_max = 220

      testingComponent = createVue({
        template: `<div><test max="${maxNumber}" number="${inputNumber}"/></div>`
      })

      testingComponent.$refs.inputNumber.value = set_max
      testingComponent.$refs.inputNumber.dispatchEvent(new Event('input'))

      testingComponent.$nextTick(() => {
        expect(testingComponent.maxValue).toBeLessThan(set_max)
        expect(testingComponent.maxValue).toEqual(testingComponent.value)
        expect(testingComponent.$refs.plus.disabled).toBe(true)
        done()
      })

    })

  })

})
