<template>
  <a-switch
    un-checked-children="default"
    checked-children="customize"
    v-model:checked="customize"
  />
  <a-divider />
  <a-config-provider>
    <template v-if="customize" #renderEmpty>
      <div style="text-align: center">
        <smile-outlined style="font-size: 20px" />
        <p>Data Not Found</p>
      </div>
    </template>
    <div class="config-provider">
      <h3>Select</h3>
      <a-select :style="style" :options="[]" />

      <h3>TreeSelect</h3>
      <a-tree-select :style="style" :tree-data="[]" />

      <h3>Cascader</h3>
      <a-cascader :style="style" :options="[]" :show-search="true" />

      <h3>Transfer</h3>
      <a-transfer :data-source="[]" />

      <h3>Table</h3>
      <a-table style="margin-top: 8px" :columns="columns" :data-source="[]" />
      <h3>List</h3>
      <a-list :data-source="[]" />
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    SmileOutlined,
  },
  setup() {
    const customize = ref<boolean>(false);

    return {
      customize,
      style: { width: '200px' },
      columns: [{ title: 'Name' }, { title: 'Age' }],
    };
  },
});
</script>
<style scoped>
.code-box-demo .config-provider h3 {
  font-size: inherit;
  margin: 16px 0 8px 0;
}
</style>
