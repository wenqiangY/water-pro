<template>
  <a-steps>
    <a-step status="finish" title="Login">
      <template #icon>
        <user-outlined />
      </template>
    </a-step>
    <a-step status="finish" title="Verification">
      <template #icon>
        <solution-outlined />
      </template>
    </a-step>
    <a-step status="process" title="Pay">
      <template #icon>
        <loading-outlined />
      </template>
    </a-step>
    <a-step status="wait" title="Done">
      <template #icon>
        <smile-outlined />
      </template>
    </a-step>
  </a-steps>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    UserOutlined,
    SolutionOutlined,
    LoadingOutlined,
    SmileOutlined,
  },
});
</script>
