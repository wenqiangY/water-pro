<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1">
      <template #tab>
        <span>
          <apple-outlined />
          Tab 1
        </span>
      </template>
      Tab 1
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #tab>
        <span>
          <android-outlined />
          Tab 2
        </span>
      </template>
      Tab 2
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      activeKey: ref('1'),
    };
  },
  components: {
    AppleOutlined,
    AndroidOutlined,
  },
});
</script>
