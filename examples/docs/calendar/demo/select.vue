<template>
  <a-alert :message="`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`" />
  <div
    :style="{
      display: 'inline-block',
      width: '500px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
    }"
  >
    <a-calendar :value="date" v-bind:select="onSelect" v-bind:panelChange="onPanelChange" />
  </div>
  <div
    :style="{
      display: 'inline-block',
      width: '500px',
      marginLeft: '20px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
    }"
  >
    <a-calendar v-model:value="date1" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment, { Moment } from 'moment';

export default defineComponent({
  setup() {
    const date = ref(moment('2017-01-25'));
    const selectedValue = ref(moment('2017-01-25'));
    const date1 = ref(moment('2017-01-25'));

    const onSelect = (value: Moment) => {
      date.value = value;
      selectedValue.value = value;
    };
    const onPanelChange = (value: Moment) => {
      date.value = value;
    };
    return {
      date,
      selectedValue,
      date1,
      onSelect,
      onPanelChange,
    };
  },
});
</script>
