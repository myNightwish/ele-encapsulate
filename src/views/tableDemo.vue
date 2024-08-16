<template>
  <Mi-Table
    :options="tableConfig"
    :data="mockTableData"
    v-model:isEditRow="isEditRow"
    :total="total"
    size="small"
    stripe
    sortable
    :table-sort="{ prop: 'date', order: 'descending' }"
    :curPage="curPage"
    :pageSizeArr="[10, 20, 30]"
    v-model:editRowFlag="editRowFlag"
    style="width: 100%"
    @cancelInput="cancelInput"
    @ensureInput="ensureInput"
    @changePageSize="changePageSize"
    @changeCurPage="changeCurPage"
  >
    <template #date="{scope}">
      <span >{{ scope.row.date }}
      </span>
    </template>
    <template #name="{scope}">
      <div style="display: flex; align-items: center">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </div>
    </template>
    <!-- 操作编辑区 -->
    <template #action="{scope}">
      <el-button size="small" type="primary" @click.prevent="toggleEditRow(scope)">编辑</el-button>
      <el-button size="small" type="danger" @click.prevent="deleteRow(scope)">删除</el-button>
    </template>
    <!-- 操作删除显示区 -->
    <template #editRow="{scope}">
      <el-button size="small" type="primary" @click.stop="confirmEditRow(scope)">确定编辑</el-button>
      <el-button size="small" type="danger" @click.stop="cancelEditRow(scope)">取消编辑</el-button>
    </template>
    <!-- 单元格删除区 -->
    <template #editCell="{scope}">
      <el-button size="small" type="primary" @click.prevent="confirmEditCell(scope)">确认</el-button>
      <el-button size="small" type="danger" @click.prevent="cancelEditCell(scope)">取消</el-button>
    </template>
  </Mi-Table>
</template>

<script lang="ts" setup>
import {tableConfig} from '@/config/tableConfig';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import '@/mock/index';

const mockTableData = ref<any[]>([]);

// 定义当前编辑行的标识符
const editRowFlag = ref<string>('');
const isEditRow = ref<boolean>(false);

// 分页相关
const curPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const fetchData = async () => {
  try {
    const response = await axios.get('/api/data/list', {
      params: { page: curPage.value, pageSize: pageSize.value },
    });
    mockTableData.value = response.data.data.items;
    total.value = response.data.data.total;
  } catch (error) {
    console.error('数据加载失败：', error);
    // 这里可以添加用户提示或其他处理方式
  }
};
onMounted(() => {
  fetchData();
});

watch([curPage, pageSize], fetchData);

const changePageSize = (size: number) => {
  pageSize.value = size;
};

const changeCurPage = (page: number) => {
  curPage.value = page;
};

const toggleEditRow = (scope) => {
  editRowFlag.value = scope.row.rowEdit ? '' : 'edit';
  isEditRow.value = !isEditRow.value;
};

const deleteRow = (scope) => {
  // 这里添加删除逻辑
   // 查找并删除该行
  const rowIndex = mockTableData.value.findIndex(row => row === scope.row);
  if (rowIndex !== -1) {
    mockTableData.value.splice(rowIndex, 1);
    // 更新 total 的值，以反映删除后的总数
    total.value -= 1;
  }
  console.log('删除后的数据:', mockTableData.value);
};

const confirmEditCell = (scope) => {
  // console.log('确认编辑单元格:', scope);
  // 这里添加确认编辑单元格的逻辑
};

const cancelEditCell = (scope) => {
  console.log('取消编辑单元格:', scope);
  // 这里添加取消编辑单元格的逻辑
};

const ensureInput = (scope) => {
  console.log('确认输入:', scope);
  // 这里添加确认输入的逻辑
};

const cancelInput = (scope) => {
  console.log('取消输入:', scope);
  editRowFlag.value = '';
};

const cancelEditRow = (scope) => {
  console.log('取消编辑:', scope);
  const editedRow = mockTableData.value.find(row => row === scope.row);
  if (editedRow) {
    // 确保关闭当前行的编辑状态
    editedRow.rowEdit = false;
  }
  editRowFlag.value = '';
  isEditRow.value = false;
};

const confirmEditRow = (scope) => {
  console.log('确认编辑:', scope);
  // 找到编辑行的数据，并应用编辑后的值
  const editedRow = mockTableData.value.find(row => row === scope.row);
  if (editedRow) {
    // 更新表格数据，假设你已经在 `scope.row` 中修改了值
    Object.assign(editedRow, scope.row);
    // 确保关闭当前行的编辑状态
    editedRow.rowEdit = false;
  }

  // 触发编辑完成的操作，例如关闭编辑模式
  editRowFlag.value = '';
  isEditRow.value = false;

  // 可以在这里触发一个事件或调用API来保存更新后的数据
  console.log('确认编辑后的数据:', mockTableData.value);
};

</script>

<style lang="scss" scoped>
.el-table .cell {
  display: flex;
  align-items: center;
}
</style>
