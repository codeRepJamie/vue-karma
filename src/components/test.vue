<template>
  <span>
    <button ref="minus" @click="minus" :disabled="isMinusDisabled">-</button>
    <input ref="inputNumber" type="number" v-model.number="value">
    <button ref="plus" @click="plus">+</button>
  </span>
</template>

<script>
  const DEFAULT_VALUE = 0,
    DEFAULT_MIN_VALUE = 0

  export default {
    name: 'test',
    props: ['number', 'min', 'max'],
    watch: {
      value(value, old_value) {

        value = Number(value)
        if (value <= this.minValue) {
          this.value = this.minValue
        } else {
          this.value = value
        }
      }
    },
    data() {
      let _value, _min, _max
      _value = Number(this.number) ? Number(this.number) : DEFAULT_VALUE
      _min = Number(this.min) ? Number(this.min) : DEFAULT_MIN_VALUE
      _max = Number(this.max) ? Number(this.max) : null

      return {
        minValue: _min,
        maxValue: _max,
        value: _value
      }
    },
    computed: {
      isMinusDisabled() {
        return this.value === this.minValue
      }
    },
    methods: {
      minus() {
        if (this.value > this.minValue) {
          this.value--
        } else {
          this.value = this.minValue
        }
      },
      plus() {
        if (this.maxValue > 0 && this.value > this.maxValue) {
          return false;
        }
        this.value++
      }
    }
  }
</script>
