<template>
  <a-table :columns="columns" :data-source="data" class="components-table-demo-nested">
    <template #operation>
      <a>Publish</a>
    </template>
    <template #expandedRowRender>
      <a-table :columns="innerColumns" :data-source="innerData" :pagination="false">
        <template #status>
          <span>
            <a-badge status="success" />
            Finished
          </span>
        </template>
        <template #operation>
          <span class="table-operation">
            <a>Pause</a>
            <a>Stop</a>
            <a-dropdown>
              <template #overlay>
                <a-menu>
                  <a-menu-item>Action 1</a-menu-item>
                  <a-menu-item>Action 2</a-menu-item>
                </a-menu>
              </template>
              <a>
                More
                <down-outlined />
              </a>
            </a-dropdown>
          </span>
        </template>
      </a-table>
    </template>
  </a-table>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation', slots: { customRender: 'operation' } },
];

interface DataItem {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}

const innerColumns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', key: 'state', slots: { customRender: 'status' } },
  { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' },
  },
];

interface innerDataItem {
  key: number;
  date: string;
  name: string;
  upgradeNum: string;
}

const innerData: innerDataItem[] = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: 'This is production name',
    upgradeNum: 'Upgraded: 56',
  });
}

export default defineComponent({
  components: {
    DownOutlined,
  },
  setup() {
    return {
      data,
      columns,
      innerColumns,
      innerData,
    };
  },
});
</script>
