<template>
  <div>
    <p>use value and @change</p>
    <a-time-picker :value="value" @change="onChange" />
    <br />
    <br />
    <p>v-model</p>
    <a-time-picker v-model="value" />
    <br />
    <br />
    <p>Do not change</p>
    <a-time-picker :value="value2" />
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      value: null,
      value2: moment(),
    };
  },
  methods: {
    onChange(time) {
      console.log(time);
      this.value = time;
    },
  },
};
</script>
