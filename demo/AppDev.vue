<template>
-{{dateValue}}--
<br />
  <a-date-picker
    show-time
    v-model:value="dateValue"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
  />
<br />
  -{{rangeValue}}-
<br />
  <a-range-picker
    :show-time="{ format: 'HH:mm:ss' }"
    v-model:value="rangeValue"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
    time-rounding
  />
  -{{rangeValue}}-
<br />
  <a-range-picker
    :show-time="{ format: 'HH:mm:ss' }"
    v-model:value="rangeValue"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
  />
  -{{rangeValue}}-
<br />
  <a-range-picker
    :show-time="{ format: 'HH:mm:ss' }"
    v-model:value="rangeValue"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
    time-rounding
    showTodayButton
    showYesterdayButton
    showSevenDaysButton
    showThirtyDaysButton
  />
  -{{rangeValue}}-
<br />
  <a-range-picker
    :show-time="{ format: 'HH:mm:ss' }"
    v-model:value="rangeValue"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
    showTodayButton
    showYesterdayButton
    showSevenDaysButton
    showThirtyDaysButton
  />
</template>
<script lang="tsx">
import { defineComponent, ref } from 'vue';

import ADatePicker from '@fe6/water-pro/es/date-picker';
import '@fe6/water-pro/es/date-picker/style';

export default defineComponent({
  components: {
    ADatePicker,
    ARangePicker: ADatePicker.RangePicker,
  },
  setup() {
    return {
      dateValue: ref(''),
      rangeValue: ref(['', '']),
    }
  }
});
</script>
