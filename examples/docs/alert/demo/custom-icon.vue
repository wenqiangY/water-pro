<template>
  <a-alert message="showIcon = false" type="success">
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert message="Success Tips" type="success" showIcon>
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert message="Informational Notes" type="info" showIcon>
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert message="Warning" type="warning" showIcon>
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert message="Error" type="error" showIcon>
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    show-icon
  >
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert
    message="Informational Notes"
    description="Additional description and informations about copywriting."
    type="info"
    show-icon
  >
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert
    message="Warning"
    description="This is a warning notice about copywriting."
    type="warning"
    show-icon
  >
    <template #icon><smile-outlined /></template>
  </a-alert>
  <a-alert
    message="Error"
    description="This is an error message about copywriting."
    type="error"
    show-icon
  >
    <template #icon><smile-outlined /></template>
  </a-alert>
</template>
<script lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    SmileOutlined,
  },
});
</script>

