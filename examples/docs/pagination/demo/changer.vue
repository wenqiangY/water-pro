<template>
  <div>
    <a-pagination
      show-size-changer
      v-model:current="current1"
      v-model:pageSize="pageSize"
      :total="500"
      @showSizeChange="onShowSizeChange"
    />
    <br />
    <a-pagination
      v-model:current="current2"
      show-size-changer
      :total="500"
      disabled
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const pageSize = ref(20);
    const current1 = ref(3);
    const current2 = ref(4);
    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(current, pageSize);
    };
    watch(pageSize, () => {
      console.log('pageSize', pageSize.value);
    });
    watch(current1, () => {
      console.log('current', current1.value);
    });
    return {
      pageSize,
      current1,
      current2,
      onShowSizeChange,
    };
  },
});
</script>
