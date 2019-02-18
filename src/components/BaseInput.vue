<template>
  <div>
    <label>{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="value"
      @input="updateValue"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>

<style scoped></style>
