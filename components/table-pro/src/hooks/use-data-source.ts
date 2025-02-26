/** @format */

import type { TableProProps, FetchParams, SorterResult } from '../types/table';
import type { PaginationProps } from '../types/pagination';

import {
  ref,
  unref,
  ComputedRef,
  computed,
  onMounted,
  watch,
  reactive,
  Ref,
  watchEffect,
} from 'vue';
import { isArray, isFunction, isBoolean, uuid } from '@fe6/shared';
import { get, cloneDeep } from 'lodash-es';

import { useTimeoutFn } from '../../../_util/hooks/use-timeout';

import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';

interface ActionType {
  getPaginationInfo: ComputedRef<boolean | PaginationProps>;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  getFieldsValue: () => Recordable;
  clearSelectedRowKeys: () => void;
  tableData: Ref<Recordable[]>;
}

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}

export function useDataSource(
  propsRef: ComputedRef<TableProProps>,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
    getFieldsValue,
    clearSelectedRowKeys,
    tableData,
  }: ActionType,
  emit: EmitType,
) {
  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });
  const dataSourceRef = ref<Recordable[]>([]);

  // watchEffect(() => {
  //   const { dataSource, api } = unref(propsRef);
  //   !api && dataSource && (dataSourceRef.value = dataSource);
  // });

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource, api } = unref(propsRef);
      !api && dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true,
    },
  );

  function handleTableChange(
    pagination: PaginationProps,
    filters: Partial<Recordable<string[]>>,
    sorter: SorterResult,
  ) {
    const { clearSelectOnPageChange, sortFn, filterFn } = unref(propsRef);
    if (clearSelectOnPageChange) {
      clearSelectedRowKeys();
    }
    setPagination(pagination);

    const params: Recordable = {};
    if (sorter && isFunction(sortFn)) {
      const sortInfo = (sortFn as Function)(sorter);
      searchState.sortInfo = sortInfo;
      params.sortInfo = sortInfo;
    }

    if (filters && isFunction(filterFn)) {
      const filterInfo = (filterFn as Function)(filters);
      searchState.filterInfo = filterInfo;
      params.filterInfo = filterInfo;
    }
    fetch({
      params,
    });
  }

  function setTableKey(items: any[]) {
    if (!items || !isArray(items)) {
      return;
    }
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = uuid();
      }
      if (item.children && item.children.length) {
        setTableKey(item.children);
      }
    });
  }

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
  });

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return [];
    }
    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0];
      const lastItem = dataSource[dataSource.length - 1];

      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
          const data = cloneDeep(unref(dataSourceRef));
          data.forEach((item) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = uuid();
            }
            if (item.children && item.children.length) {
              setTableKey(item.children);
            }
          });
          dataSourceRef.value = data;
        }
      }
    }
    return unref(dataSourceRef);
  });

  async function updateTableData(index: number, key: string, value: any) {
    const record = dataSourceRef.value[index];
    if (record) {
      dataSourceRef.value[index][key] = value;
    }
    return dataSourceRef.value[index];
  }

  function fetch(opt?: FetchParams) {
    const { api, searchInfo, fetchSetting, beforeFetch, afterFetch, useSearchForm, pagination } =
      unref(propsRef);
    if (!api || !isFunction(api)) {
      return;
    }
    try {
      setLoading(true);
      const { pageField, sizeField, listField, totalField } = fetchSetting || FETCH_SETTING;
      let pageParams: Recordable = {};

      const { current = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.page) || current;
        pageParams[sizeField] = pageSize;
      }

      const { sortInfo = {}, filterInfo } = searchState;

      let params: Recordable = {
        ...pageParams,
        ...(useSearchForm ? getFieldsValue() : {}),
        ...searchInfo,
        ...(opt?.searchInfo ?? {}),
        ...sortInfo,
        ...filterInfo,
        ...(opt?.sortInfo ?? {}),
        ...(opt?.filterInfo ?? {}),
      };
      if (beforeFetch && isFunction(beforeFetch)) {
        params = beforeFetch(params) || params;
      }

      const fetchApi = opt?.api || api;

      fetchApi({
        params,
        success: (res) => {
          const isArrayResult = isArray(res);
          setLoading(false);

          let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
          const resultTotal: number = isArrayResult ? 0 : get(res, totalField);

          // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
          if (resultTotal) {
            const currentTotalPage = Math.ceil(resultTotal / pageSize);
            if (current > currentTotalPage) {
              setPagination({
                current: currentTotalPage,
              });
              fetch(opt);
            }
          }

          if (afterFetch && isFunction(afterFetch)) {
            resultItems = afterFetch(resultItems) || resultItems;
          }
          dataSourceRef.value = resultItems;
          setPagination({
            total: resultTotal || 0,
          });
          if (opt && opt.page) {
            setPagination({
              current: opt.page || 1,
            });
          }
          emit('fetch-success', {
            items: unref(resultItems),
            total: resultTotal,
            params,
          });
        },
        error: (error) => {
          setLoading(false);
          emit('fetch-error', error);
          dataSourceRef.value = [];
          setPagination({
            total: 0,
          });
        },
      });
    } catch (error) {
      emit('fetch-error', error);
      dataSourceRef.value = [];
      setLoading(false);
      setPagination({
        total: 0,
      });
    } finally {
      // fix table 加载数据的时候没有loading
      // setLoading(false);
      emit('fetch-finally');
    }
  }

  function setTableData<T = Recordable>(values: T[]) {
    dataSourceRef.value = values;
  }

  function getDataSource<T = Recordable>() {
    return getDataSourceRef.value as T[];
  }

  async function reload(opt?: FetchParams) {
    await fetch(opt);
  }

  onMounted(() => {
    useTimeoutFn(() => {
      unref(propsRef).immediate && fetch();
    }, 16);
  });

  return {
    getDataSourceRef,
    getDataSource,
    getRowKey,
    setTableData,
    getAutoCreateKey,
    fetch,
    reload,
    updateTableData,
    handleTableChange,
  };
}
