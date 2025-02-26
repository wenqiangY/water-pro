<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template v-for="col in ['name', 'age', 'address']" #[col]="{ text, record }" :key="col">
      <div>
        <a-input
          v-if="editableData[record.key]"
          v-model:value="editableData[record.key][col]"
          style="margin: -5px 0"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template #operation="{ record }">
      <div class="editable-row-operations">
        <span v-if="editableData[record.key]">
          <a @click="save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script lang="ts">
import { cloneDeep } from 'lodash-es';
import { defineComponent, reactive, ref, UnwrapRef } from 'vue';

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    slots: { customRender: 'name' },
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    slots: { customRender: 'age' },
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    slots: { customRender: 'address' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
];
interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}
const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default defineComponent({
  setup() {
    const dataSource = ref(data);
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

    const edit = (key: string) => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = (key: string) => {
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };
    const cancel = (key: string) => {
      delete editableData[key];
    };
    return {
      dataSource,
      columns,
      editingKey: '',
      editableData,
      edit,
      save,
      cancel,
    };
  },
});
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
