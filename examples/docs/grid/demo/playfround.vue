<template>
  <div id="components-grid-demo-playground">
    <div style="margin-bottom: 16px; text-align: left;">
      <span style="margin-right: 6px">Horizontal Gutter (px):</span>
      <div style="width: 50%">
        <a-slider
          v-model:value="gutterKey"
          :min="0"
          :max="Object.keys(gutters).length - 1"
          :marks="gutters"
          :step="null"
        />
      </div>
      <span style="margin-right: 6px">Vertical Gutter (px):</span>
      <div style="width: 50%">
        <a-slider
          v-model:value="vgutterKey"
          :min="0"
          :max="Object.keys(vgutters).length - 1"
          :marks="vgutters"
          :step="null"
        />
      </div>
      <span style="margin-right: 6px">Column Count:</span>
      <div style="width: 50%">
        <a-slider
          v-model:value="colCountKey"
          :min="0"
          :max="Object.keys(colCounts).length - 1"
          :marks="colCounts"
          :step="null"
        />
      </div>
    </div>
    <a-row :gutter="[gutters[gutterKey], vgutters[vgutterKey]]">
      <a-col
        v-for="item in colCounts[colCountKey]"
        :key="item.toString()"
        :span="24 / colCounts[colCountKey]"
      >
        <div>Column</div>
      </a-col>
    </a-row>
    <a-row :gutter="[gutters[gutterKey], vgutters[vgutterKey]]">
      <a-col
        v-for="item in colCounts[colCountKey]"
        :key="item.toString()"
        :span="24 / colCounts[colCountKey]"
      >
        <div>Column</div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  setup() {
    const state = reactive<{
      gutterKey: number;
      vgutterKey: number;
      colCountKey: number;
      gutters: { [key: number]: number };
      colCounts: { [key: number]: number };
      vgutters: { [key: number]: number };
    }>({
      gutterKey: 1,
      vgutterKey: 1,
      colCountKey: 2,
      gutters: {},
      colCounts: {},
      vgutters: {},
    });
    [8, 16, 24, 32, 40, 48].forEach((value: number, i: number) => {
      state.gutters[i] = value;
    });
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      state.vgutters[i] = value;
    });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
      state.colCounts[i] = value;
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style scoped>
#components-grid-demo-playground :deep(.ant-col) {
  background: transparent;
  border: 0;
}
#components-grid-demo-playground :deep(.ant-col) > div {
  background: #00a0e9;
  height: 120px;
  line-height: 120px;
  font-size: 13px;
}
#components-grid-demo-playground pre {
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 16px;
}
</style>
