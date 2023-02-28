<template>
  <div class="app-input">
    <label :for="id" :class="labelClass">{{ labelText }}</label>
    <input
      v-bind="$attrs"
      :name="name"
      v-model="inputValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="id"
      :placeholder="placeholder"
      :class="inputClass"
      :disabled="disabled"
    />
  </div>
</template>

<script>

export default {
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    labelText: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: ''
    },
  },
  setup() {
    return {}
  }
}
</script>
