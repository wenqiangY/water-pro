<template>
  <a-textarea v-model:value="value" placeholder="Basic usage" :rows="4" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref<string>('');
    return {
      value,
    };
  },
});
</script>
