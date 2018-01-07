<template>
  <span>
    <button ref="minus" @click="minus">-</button>
    <input ref="inputNumber" type="number" v-model.number="value">
    <button ref="plus" @click="plus">+</button>
  </span>
</template>

<script>
  const DEFAULT_VALUE = 0,
    DEFAULT_MIN_VALUE = 0
  ;

  export default {
    name: 'test',
    props: ['number', 'min'],
    data() {
      let _value, _min;
      _value = Number(this.number) ? Number(this.number) : DEFAULT_VALUE
      _min = Number(this.min) ? Number(this.min) : DEFAULT_MIN_VALUE;
      console.log(_min);
      return {
        _min: _min,
        value: _value
      }
    },
    methods: {
      minus() {
        if (this.value > this._min) {
          --this.value;
        } else {
          this.value = this._min;
        }
      },
      plus() {
        ++this.value;
      }
    }
  }
</script>
