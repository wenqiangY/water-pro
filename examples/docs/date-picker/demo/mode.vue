<template>
  <a-space direction="vertical">
    <a-date-picker
      :mode="mode1"
      show-time
      @openChange="handleOpenChange1"
      @panelChange="handlePanelChange1"
    />
    <a-range-picker
      :placeholder="['Start month', 'End month']"
      format="YYYY-MM"
      :value="value"
      :mode="mode2"
      @panelChange="handlePanelChange2"
      @change="handleChange"
    />
  </a-space>
</template>
<script lang="ts">
import { Moment } from 'moment';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const mode1 = ref<string>('time');
    const mode2 = ref<string[]>(['month', 'month']);
    const value = ref<Moment[]>([]);

    const handleOpenChange1 = (open: boolean) => {
      if (open) {
        mode1.value = 'time';
      }
    };

    const handleChange = (val: Moment[]) => {
      value.value = val;
    };

    const handlePanelChange1 = (val: Moment[], mode: string) => {
      mode1.value = mode;
    };

    const handlePanelChange2 = (val: Moment[], mode: string[]) => {
      value.value = val;
      mode2.value = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ];
    };

    return {
      mode1,
      mode2,
      value,
      handleOpenChange1,
      handleChange,
      handlePanelChange1,
      handlePanelChange2,
    };
  },
});
</script>
