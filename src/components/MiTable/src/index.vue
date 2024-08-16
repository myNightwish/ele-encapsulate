<template>
  <el-table
    v-bind="$attrs"
    :data="copyTableData"
    :default-sort="tableSort"
    class="tabble-wrapper"
    @row-click="rowClick"
  >
    <template v-for="(item, index) in normalOptions" :key="item.prop">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.colWidth"
        sortable
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop]" size="small"></el-input>
          </template>
          <template v-else>
            <template v-if="isEditingCell(scope.column.id, scope.$index)">
              <div class="input-edit-wrapper">
                <el-input v-model="scope.row[item.prop]" size="small"></el-input>
                <span v-if="$slots.editCell" @click.stop="handleEditCell" class="self-edit">
                  <slot name="editCell" :scope="scope"></slot>
                </span>
                <div v-else>
                  <el-icon @click.stop="ensureInput(scope)" class="ensure"><Select /></el-icon>
                  <el-icon @click.stop="cancelInput" class="cancel"><CloseBold /></el-icon>
                </div>
              </div>
            </template>
            <div v-else class="edit-wrapper">
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop] }}</span>
              <span v-if="item.editable" @click.stop="clickEdit(scope.column.id, scope.$index, scope)">
                <el-icon><Edit /></el-icon>
              </span>
            </div>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :prop="actionOptions.prop"
      :label="actionOptions.label"
      :align="actionOptions.align"
      :width="actionOptions.colWidth"
    >
      <template #default="scope">
        <slot v-if="scope.row.rowEdit" name="editRow" :scope="scope"></slot>
        <slot v-else name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="showPagination" class="demo-pagination-block">
    <el-pagination
      :current-page="curPage"
      :page-size="pageSize"
      :page-sizes="pageSizeArr"
      :size="size"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, watch, onMounted, PropType } from 'vue';
import { Edit, Select, CloseBold } from '@element-plus/icons';
import cloneDeep from 'lodash/cloneDeep';
import {tableOptions} from '@/types/tableOptions.ts';

defineComponent({
  name: 'MiTable',
})

const props = defineProps({
  options: {
    type: Array as PropType<tableOptions[]>,
    require: true,
    default: () => ([])
  },
  // 表单数据
  data: {
    type: Array as PropType<any[]>,
    require: true,
    default: () => ([])
  },
  // 表单整体是否为可编辑行
  isEditRow: {
    type: Boolean,
    default: false
  },
  // 编辑行的按钮标识，哪一行
  editRowFlag: {
    type: String,
    default: ''
  },
  curPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    require: true
  },
  // 一页多少条
  pageSize: {
    type: Number,
    default: 10
  },
  size: {
    type: String,
    default: 'small'
  },
  pageSizeArr: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40]
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  tableSort: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits([
  'ensureInput',
  'cancelInput',
  'changeCurPage',
  'changePageSize',
  'update:editRowFlag',
  'update:isEditRow'
]);

const copyTableData = ref(cloneDeep(props.data));
const curEdit = ref<string>('');

const normalOptions = computed(() => props.options?.filter(item => !item.action));
const actionOptions = computed(() => props.options?.find(item => item.action));

onMounted(() => updateRowEdit(false));

watch(() => props.data, val => {
  if (val) {
    copyTableData.value = val;
  }
}, { deep: true });

watch(() => props.editRowFlag, () => {
  if (!props.isEditRow) return;
  updateRowEdit(false);
}, { deep: true });

const handleSizeChange = (val: number) => emits('changePageSize', val);
const handleCurrentChange = (val: number) => emits('changeCurPage', val);

const updateRowEdit = (flag: boolean) => {
  copyTableData.value.forEach(item => item.rowEdit = flag);
};

const ensureInput = (scope) => {
  // 找到编辑行的数据，并应用编辑后的值
  const editedRow = copyTableData.value.find(row => row === scope.row);
  if (editedRow) {
    // 更新表格数据，假设你已经在 `scope.row` 中修改了值
    Object.assign(editedRow, scope.row);
    // 确保关闭当前行的编辑状态
    editedRow.rowEdit = false;
  }
  // 恢复按钮到非编辑状态
  curEdit.value = '';
  emits('update:editRowFlag', '');
  emits('update:isEditRow', false);
  emits('ensureInput', scope);
};

const cancelInput = () => {
  curEdit.value = '';
  emits('cancelInput');
};

const isEditingCell = (col: string, idx: number) => curEdit.value === `${col}--${idx}`;
const handleEditCell = (scope) => {
    // 确保更新数据
    const editedRow = copyTableData.value.find(row => row === scope.row);
  if (editedRow) {
    // 将编辑后的值应用到表格数据
    Object.assign(editedRow, scope.row);
      // 恢复非编辑状态
    editedRow.rowEdit = false;
  }
  curEdit.value = ''; // 清空当前编辑的单元格标识
};

const rowClick = (row: any, col: any) => {
  if (col.label === actionOptions.value.label && props.isEditRow) {
    row.rowEdit = !row.rowEdit;
    if (row.rowEdit) {
      emits('update:editRowFlag', 'edit');
    } else {
      emits('update:editRowFlag', '');
    }
    copyTableData.value.forEach(item => {
      if (item !== row) item.rowEdit = false;
    });
  }
};
const clickEdit = (col: string, idx: number, scope: any) => {
  curEdit.value = `${col}--${idx}`;
  scope.row.rowEdit = false; // 确保不激活整行的编辑状态
};
</script>

<style lang="scss">
.input-edit-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;

  .ensure {
    color: red;
  }
  .cancel {
    color: green;
  }
}
.self-edit {
  display: flex;
  justify-content: center;
}

.edit-wrapper {
  display: flex;
  align-items: center;
  .el-icon {
    margin-left: 16px;
  }
}
</style>
