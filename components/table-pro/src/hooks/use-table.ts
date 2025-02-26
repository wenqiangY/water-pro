/** @format */

import type {
  TableProProps,
  TableActionType,
  FetchParams,
  BasicColumn,
} from '../types/table';
import type { PaginationProps } from '../types/pagination';
import type { DynamicProps } from '../../../_util/types/utils';

import { ref, onUnmounted, unref, watch, toRaw } from 'vue';

import { getDynamicProps } from '../../../_util/use';
import { isProdMode } from '../../../_util/env';
import warning from '../../../_util/warning';
import type { FormActionType } from '../../../form-pro';

type Props = Partial<DynamicProps<TableProProps>>;

type UseTableMethod = TableActionType & {
  getForm: () => FormActionType;
};

export function useTable(
  tableProps?: Props,
): [
  (instance: TableActionType, formInstance: UseTableMethod) => void,
  UseTableMethod,
] {
  const tableRef = ref<Nullable<TableActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const formRef = ref<Nullable<UseTableMethod>>(null);

  function register(instance: TableActionType, formInstance: UseTableMethod) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null;
        loadedRef.value = null;
      });

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) {
      return;
    }

    tableRef.value = instance;
    formRef.value = formInstance;
    tableProps && instance.setProps(getDynamicProps(tableProps));
    loadedRef.value = true;

    watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef);
    if (!table) {
      warning(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!',
      );
    }
    return table as TableActionType;
  }

  const methods: TableActionType & {
    getForm: () => FormActionType;
  } = {
    reload: async (opt?: FetchParams) => {
      getTableInstance().reload(opt);
    },
    setProps: (props: Partial<TableProProps>) => {
      getTableInstance().setProps(props);
    },
    redoHeight: () => {
      getTableInstance().redoHeight();
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading);
    },
    getDataSource: () => {
      return toRaw(getTableInstance().getDataSource());
    },
    getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || [];
      return toRaw(columns);
    },
    setColumns: (columns: BasicColumn[] | string[]) => {
      getTableInstance().setColumns(columns);
    },
    setTableData: (values: any[]) => {
      return getTableInstance().setTableData(values);
    },
    setPagination: (info: Partial<PaginationProps>) => {
      return getTableInstance().setPagination(info);
    },
    deleteSelectRowByKey: (key: string) => {
      getTableInstance().deleteSelectRowByKey(key);
    },
    getSelectRowKeys: () => {
      return toRaw(getTableInstance().getSelectRowKeys());
    },
    getSelectRows: () => {
      return toRaw(getTableInstance().getSelectRows());
    },
    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys();
    },
    setSelectedRowKeys: (keys: string[] | number[]) => {
      getTableInstance().setSelectedRowKeys(keys);
    },
    getPaginationRef: () => {
      return getTableInstance().getPaginationRef();
    },
    getSize: () => {
      return toRaw(getTableInstance().getSize());
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value);
    },
    getRowSelection: () => {
      return toRaw(getTableInstance().getRowSelection());
    },
    getCacheColumns: () => {
      return toRaw(getTableInstance().getCacheColumns());
    },
    getForm: () => {
      return (unref(formRef) as unknown) as FormActionType;
    },
    setShowPagination: async (show: boolean) => {
      getTableInstance().setShowPagination(show);
    },
    getShowPagination: () => {
      return toRaw(getTableInstance().getShowPagination());
    },
  };

  return [register, methods];
}
