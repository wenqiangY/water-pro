<template>
  <a-cascader
    v-model:value="value"
    :options="options"
    :load-data="loadData"
    placeholder="Please select"
    change-on-select
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
interface Option {
  value: string;
  label: string;
  loading?: boolean;
  isLeaf?: boolean;
  children?: Option[];
}
export default defineComponent({
  setup() {
    const options = ref<Option[]>([
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
      },
    ]);

    const loadData = (selectedOptions: Option[]) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      // load options lazily
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: 'dynamic1',
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: 'dynamic2',
          },
        ];
        options.value = [...options.value];
      }, 1000);
    };

    return {
      value: ref<string[]>([]),
      options,
      loadData,
    };
  },
});
</script>
