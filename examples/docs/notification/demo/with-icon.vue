<template>
  <div>
    <a-button @click="() => openNotificationWithIcon('success')">Success</a-button>
    <a-button @click="() => openNotificationWithIcon('info')">Info</a-button>
    <a-button @click="() => openNotificationWithIcon('warning')">Warning</a-button>
    <a-button @click="() => openNotificationWithIcon('error')">Error</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { notification } from '@fe6/water-pro';

export default defineComponent({
  setup() {
    const openNotificationWithIcon = (type: string) => {
      notification[type]({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    };

    return {
      openNotificationWithIcon,
    };
  },
});
</script>
