<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="This is panel header 3" disabled>
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
    const activeKey = ref(['1']);

    watch(activeKey, val => {
      console.log(val);
    });

    return {
      text,
      activeKey,
    };
  },
});
</script>
