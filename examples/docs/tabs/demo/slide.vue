<template>
  <div style="width: 500px">
    <a-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">Horizontal</a-radio-button>
      <a-radio-button value="left">Vertical</a-radio-button>
    </a-radio-group>
    <a-tabs
      :tab-position="mode"
      :style="{ height: '200px' }"
      @prevClick="callback"
      @nextClick="callback"
      v-model:activeKey="activeKey"
    >
      <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const mode = ref('top');
    const activeKey = ref('1');
    const callback = (val: string) => {
      console.log(val);
    };
    return {
      mode,
      callback,
      activeKey,
    };
  },
});
</script>
