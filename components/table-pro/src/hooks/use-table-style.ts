/** @format */

import type { ComputedRef } from 'vue';
import type { TableProProps, TableCustomRecord } from '../types/table';

import { unref } from 'vue';
import { isFunction } from '@fe6/shared';

export function useTableStyle(propsRef: ComputedRef<TableProProps>, prefixCls: string) {
  function getRowClassName(record: TableCustomRecord, index: number) {
    const { striped, rowClassName } = unref(propsRef);
    if (!striped) {
      return;
    }
    if (rowClassName && isFunction(rowClassName)) {
      return rowClassName(record);
    }
    return (index || 0) % 2 === 1 ? `${prefixCls}-row__striped` : '';
  }

  return {
    getRowClassName,
  };
}
