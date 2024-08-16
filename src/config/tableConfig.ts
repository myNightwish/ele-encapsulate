import {tableOptions} from '@/types/tableOptions.ts';

export const tableConfig: tableOptions[] = [
  {
    value: '',
    label: '日期',
    prop: 'date',
    colWidth: "300px",
    align: 'center',
    slot: 'date',
    editable: true,
    slotEditCell: 134
  }, {
    value: '',
    label: '姓名',
    prop: 'name',
    colWidth: "200px",
    align: 'center',
    slot: 'name',
  }, {
    value: '',
    label: '地址',
    prop: 'address',
    colWidth: "400px",
    align: 'center',
    editable: true
  },
  {
    value: '',
    label: '操作',
    prop: 'operate',
    colWidth: "200px",
    action: true
  }
]