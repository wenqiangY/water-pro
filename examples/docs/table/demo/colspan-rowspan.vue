<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, h } from 'vue'; 
import { ColumnProps } from '@fe6/water-pro';
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0

const renderContent = ({ text, index }: any) => {
  const obj = {
    children: text,
    props: {} as any,
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];

export default defineComponent({
  setup() {
    const columns: ColumnProps[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        customRender: ({ text, index }) => {
          if (index < 4) {
            return h('a', { href: 'javascript:;' }, text);
          }
          return {
            children: h('a', { href: 'javascript:;' }, text),
            props: {
              colSpan: 5,
            },
          };
        },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        customRender: renderContent,
      },
      {
        title: 'Home phone',
        colSpan: 2,
        dataIndex: 'tel',
        customRender: ({ text, index }) => {
          const obj = {
            children: text,
            props: {} as any,
          };
          if (index === 2) {
            obj.props.rowSpan = 2;
          }
          // These two are merged into above cell
          if (index === 3) {
            obj.props.rowSpan = 0;
          }
          if (index === 4) {
            obj.props.colSpan = 0;
          }
          return obj;
        },
      },
      {
        title: 'Phone',
        colSpan: 0,
        dataIndex: 'phone',
        customRender: renderContent,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        customRender: renderContent,
      },
    ];
    return {
      data,
      columns,
    };
  },
});
</script>
