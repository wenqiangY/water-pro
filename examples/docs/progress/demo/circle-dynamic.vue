<template>
  <div>
    <a-progress type="circle" :percent="defaultPercent" />
    <a-button-group>
      <a-button @click="decline">
        <template #icon><minus-outlined /></template>
      </a-button>
      <a-button @click="increase">
        <template #icon><plus-outlined /></template>
      </a-button>
    </a-button-group>
  </div>
</template>
<script lang="ts">
import { MinusOutlined } from '@ant-design/icons-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    MinusOutlined,
    PlusOutlined,
  },
  setup() {
    const defaultPercent = ref<number>(0);

    const increase = () => {
      const percent = defaultPercent.value + 10;
      defaultPercent.value = percent > 100 ? 100 : percent;
    };

    const decline = () => {
      const percent = defaultPercent.value - 10;
      defaultPercent.value = percent < 0 ? 0 : percent;
    };
    return {
      defaultPercent,
      increase,
      decline,
    };
  },
});
</script>
