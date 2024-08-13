<template>
  <Mi-Table :options="tableOption" :data="tableData">
    <template #date="{scope}">
      <div style="display: flex; align-items: center">
          <el-icon><Timer /></el-icon>
          <!-- 需要将原有信息展示出来 -->
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </div>
    </template>
    <template #name="{scope}">
      <div style="display: flex; align-items: center">
          <el-icon><User /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </div>
    </template>
    <template #action="{scope}">
      <el-button size="small" type="primary" @click="handleEnsure(scope)">确认</el-button>
      <el-button size="small" type="danger" @click="handleDelete(scope)">删除</el-button>
    </template>
  </Mi-Table>
</template>


<script lang="ts" setup>
import {tableOptions} from '@/types/tableOptions.ts';
import { Timer, User } from '@element-plus/icons';
import { defineComponent } from 'vue';

defineComponent({
  components: {
    Timer,
    User
  }

})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
const tableOption: tableOptions[] = [
  {
    value: '',
    label: '日期',
    prop: 'date',
    colWidth: "200px",
    align: 'center',
    slot: 'date'
  }, {
    value: '',
    label: '姓名',
    prop: 'name',
    colWidth: "200px",
    align: 'center',
    slot: 'name'
  }, {
    value: '',
    label: '地址',
    prop: 'address',
    colWidth: "200px",
    align: 'center',
  },
  {
    value: '',
    label: '操作',
    prop: 'operate',
    colWidth: "200px",
    action: true
  }
]

const handleEnsure = (scope) => {
  console.log('handleEnsure', scope)
};

const handleDelete = (scope) => {
  console.log('delete', scope)
}
</script>