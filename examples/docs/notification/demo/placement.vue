<template>
  <div>
    <a-button type="primary" @click="openNotification('topLeft')">
      <radius-upleft-outlined />
      topLeft
    </a-button>
    <a-button type="primary" @click="openNotification('topRight')">
      <radius-upright-outlined />
      topRight
    </a-button>
    <a-divider />
    <a-button type="primary" @click="openNotification('bottomLeft')">
      <radius-bottomleft-outlined />
      bottomLeft
    </a-button>
    <a-button type="primary" @click="openNotification('bottomRight')">
      <radius-bottomright-outlined />
      bottomRight
    </a-button>
  </div>
</template>
<script lang="ts">
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { notification } from '@fe6/water-pro';

export default defineComponent({
  components: {
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
  },
  setup() {
    const openNotification = (placement: string) => {
      notification.open({
        message: `Notification ${placement}`,
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement,
      });
    };
    return {
      openNotification,
    };
  },
});
</script>
