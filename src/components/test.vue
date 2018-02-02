<template>
  <span>
    <button ref="minus" @click="minus" :disabled="isMinusDisabled">-</button>
    <input ref="inputNumber" type="number" v-model.number="value">
    <button ref="plus" @click="plus" :disabled="isPlusDisabled">+</button>
  </span>
</template>

<script>
  const DEFAULT_VALUE = 0,
    DEFAULT_MIN_VALUE = 0

  export default {
    name: 'test',
    props: ['number', 'min', 'max'],
    watch: {
      value (value, old_value) {

        value = Number(value)
        if (value <= this.minValue) {
          this.value = this.minValue
        } else if (value >= this.maxValue) {
          this.value = this.maxValue
        } else {
          this.value = value
        }
      }
    },
    data () {
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
      isMinusDisabled () {
        return this.value === this.minValue
      },
      isPlusDisabled () {
        return this.value === this.maxValue
      }
    },
    methods: {
      minus () {
        this.value--
      },
      plus () {
        this.value++
      }
    }
  }
</script>
