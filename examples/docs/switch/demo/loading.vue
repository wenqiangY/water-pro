<template>
  <div>
    <a-switch loading v-model:checked="checked1" />
    <br />
    <a-switch size="small" loading v-model:checked="checked2" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive({
      checked1: true,
      checked2: false,
    });
    return { ...toRefs(state) };
  },
});
</script>
