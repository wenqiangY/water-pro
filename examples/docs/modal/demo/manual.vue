<template>
  <a-button @click="countDown">Open modal to close in 5s</a-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Modal } from '@fe6/water-pro';

export default defineComponent({
  setup() {
    const countDown = () => {
      let secondsToGo = 5;
      const modal = Modal.success({
        title: 'This is a notification message',
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
    };
    return {
      countDown,
    };
  },
});
</script>
