<template>
  <a-radio-group v-model:value="value">
    <a-radio :style="radioStyle" :value="1">Option A</a-radio>
    <a-radio :style="radioStyle" :value="2">Option B</a-radio>
    <a-radio :style="radioStyle" :value="3">Option C</a-radio>
    <a-radio :style="radioStyle" :value="4">
      More...
      <a-input v-if="value === 4" style="width: 100px; margin-left: 10px" />
    </a-radio>
  </a-radio-group>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref<number>(1);
    const radioStyle = reactive({
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    });

    return {
      value,
      radioStyle,
    };
  },
});
</script>
