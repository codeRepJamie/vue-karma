import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('组件加载加载后，title显示内容应该是Welcome to Your Vue.js App', () => {
    let vm = new Vue(HelloWorld).$mount();
    console.log(vm.msg);
    expect(vm.msg).toBe('Welcome to Your Vue.js App2')
  })
})
