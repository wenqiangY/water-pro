<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-input addon-before="Http://" addon-after=".com" v-model:value="value1" />
    </div>
    <div style="margin-bottom: 16px">
      <a-input v-model:value="value2">
        <template #addonBefore>
          <a-select v-model:value="value3" style="width: 90px">
            <a-select-option value="Http://">Http://</a-select-option>
            <a-select-option value="Https://">Https://</a-select-option>
          </a-select>
        </template>
        <template #addonAfter>
          <a-select v-model:value="value4" style="width: 80px">
            <a-select-option value=".com">.com</a-select-option>
            <a-select-option value=".jp">.jp</a-select-option>
            <a-select-option value=".cn">.cn</a-select-option>
            <a-select-option value=".org">.org</a-select-option>
          </a-select>
        </template>
      </a-input>
    </div>
    <div style="margin-bottom: 16px">
      <a-input v-model:value="value5">
        <template #addonAfter>
          <setting-outlined />
        </template>
      </a-input>
    </div>
  </div>
</template>
<script lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    SettingOutlined,
  },

  setup() {
    const value1 = ref<string>('mysite');
    const value2 = ref<string>('mysite');
    const value3 = ref<string>('Http://');
    const value4 = ref<string>('.com');
    const value5 = ref<string>('mysite');
    return {
      value1,
      value2,
      value3,
      value4,
      value5,
    };
  },
});
</script>
