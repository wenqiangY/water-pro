<template>
  <a-select
    show-search
    v-model:value="value"
    placeholder="input search text"
    style="width: 200px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    @search="handleSearch"
    @change="handleChange"
  >
    <a-select-option v-for="d in data" :key="d.value">
      {{ d.text }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts">
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import { defineComponent, ref } from 'vue';

let timeout: any;
let currentValue = '';

function fetch(value: string, callback: any) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const result = d.result;
          const data: any[] = [];
          result.forEach((r: any) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

export default defineComponent({
  setup() {
    const data = ref<any[]>([]);
    const value = ref();

    const handleSearch = (val: string) => {
      fetch(val, (d: any[]) => (data.value = d));
    };
    const handleChange = (val: string) => {
      console.log(val);
      value.value = val;
      fetch(val, (d: any[]) => (data.value = d));
    };
    return {
      handleSearch,
      handleChange,
      data,
      value,
    };
  },
});
</script>
