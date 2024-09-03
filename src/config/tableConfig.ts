import { tableOptions } from '@/types/tableOptions.ts';
import {h} from 'vue';

export const tableConfig: tableOptions[] = [
  {
    value: '',
    label: '日期',
    prop: 'date',
    colWidth: '300px',
    align: 'center',
    slot: 'date',
    editable: true,
    slotEditCell: true,
    renderHeader: () => h('span', { style: { color: 'blue' } }, '自定义-表头-日期'),
    formatter: (data) => data.replace(/-/g, '/'), // 预处理函数，将日期中的“-”替换为“/”
  },
  {
    value: '',
    label: '姓名',
    prop: 'name',
    colWidth: '200px',
    align: 'center',
    slot: 'name',
    editable: false,
    renderHeader: () => h('span', { style: { color: 'green' } }, '自定义-表头-姓名'),
    formatter: (data) => data.toUpperCase(), // 预处理函数，将姓名转换为大写
  },
  {
    value: '',
    label: '地址',
    prop: 'address',
    colWidth: '400px',
    align: 'center',
    editable: true,
    renderHeader: () => h('span', { style: { color: 'purple' } }, '自定义-表头-地址'),
    formatter: (data) => data.split(' ').join(''), // 预处理函数，移除地址中的空格
  },
  {
    value: '',
    label: '操作',
    prop: 'operate',
    colWidth: '200px',
    action: true,
    renderHeader: () => h('span', { style: { color: 'red' } }, '自定义-表头-操作'),
  }
];

