<template>
  <button :class="buttonClass" :style="buttonStyle" :disabled="isDisabled">
    <i v-if="iconClass" :class="iconClass" :style="iconStyle"></i>
    <div>
      <span>{{ text }}</span>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    text: {
      String,
      default: ''
    },
    buttonClass: {
      type: String,
      default: ''
    },
    buttonStyle: {
      type: Object,
      default: () => {}
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
