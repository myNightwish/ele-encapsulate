<template>
    <MiTable
        :options="tableConfig"
        :data="mockTableData"
        v-model:isEditRow="isEditRow"
        v-model:editRowFlag="editRowFlag"
        @cancelInput="cancelInput"
        @ensureInput="ensureInput"
        @editingCell="editingCell"
    >
        <template #date="{ scope }">
            <span>{{ scope.row.date }} </span>
        </template>
        <template #name="{ scope }">
            <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
        </template>
        <!-- 行编辑：操作区 -->
        <template #action="{ scope }">
            <el-button
                size="small"
                type="primary"
                @click.prevent="toggleEditRow(scope)"
                >编辑</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click.prevent="deleteRow(scope)"
                >删除</el-button>
        </template>
        <!-- 行编辑：编辑完毕更新区 -->
        <template #editRow="{ scope }">
            <el-button
                size="small"
                type="primary"
                @click.stop="confirmEditRow(scope)"
                >确定编辑</el-button>
            <el-button
                size="small"
                type="danger"
                @click.stop="cancelEditRow(scope)"
            >取消编辑</el-button>
        </template>
        <!-- 单元格编辑区 -->
        <template #editCell="{ scope }">
            <el-button
                size="small"
                type="primary"
                @click.prevent="confirmEditCell(scope,)"
                >确认</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click.prevent="cancelEditCell(scope)"
                >取消</el-button
            >
        </template>
    </MiTable>
</template>

<script lang="ts" setup>
import { tableConfig } from '@/config/tableConfig';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import '@/mock/index';

// 当前编辑行的标识符
const editRowFlag = ref<string>('');
const isEditRow = ref<boolean>(false);
// 保存每一行原始数据的快照
const originalOutRowData = ref<any>({});
const mockTableData = ref<any[]>([]);

const fetchData = async () => {
    try {
        const response = await axios.get('/api/data/list', {
            params: { page: 1, pageSize: 20 },
        });
        mockTableData.value = response.data.data.items;
    } catch (error) {
        console.error('数据加载失败：', error);
    }
};
onMounted(() => {
    fetchData();
});
const saveRowData = (scope) => {
    const rowId = scope.row.id;
    // 如果原始数据尚未保存，则进行保存
    if (!originalOutRowData.value[rowId]) {
        originalOutRowData.value[rowId] = { ...scope.row };
    }
}
// 更新编辑态：从而开启或关闭编辑状态的视图
const toggleEditRow = (scope) => {
    saveRowData(scope);
    editRowFlag.value = scope.row.rowEdit ? '' : 'edit';
    isEditRow.value = !isEditRow.value;
};
// 删除一行
const deleteRow = (scope) => {
    const rowIndex = mockTableData.value.findIndex((row) => row === scope.row);
    if (rowIndex !== -1) {
        mockTableData.value.splice(rowIndex, 1);
    }
};

// 记录单元格正在被编辑的数据
const editingCell = (scope) => {
    saveRowData(scope);
}
// 通用单元格编辑逻辑
const commonCellEditEnsure = (scope) => {
    const rowId = scope.row.id;
    // 找到编辑行的数据，并应用编辑后的值
    const editedRow = mockTableData.value.find((row) => row === scope.row);
    if (editedRow) {
        // 更新表格数据，假设你已经在 `scope.row` 中修改了值
        Object.assign(editedRow, scope.row);
        // 保持记录更新
        originalOutRowData.value[rowId] = { ...scope.row };
        // 确保关闭当前行的编辑状态
        editedRow.rowEdit = false;
    };
    resetInput();
}

const commonCellEditCancel = (scope) => {
    const rowId = scope.row.id;
    const originalData = originalOutRowData.value[rowId];
    // 找到编辑行的数据，并应用编辑后的值
    const editedRow = mockTableData.value.find((row) => row === scope.row);
    if (editedRow) {
        Object.assign(scope.row, originalData);
        delete originalOutRowData.value[rowId];
        // 确保关闭当前行的编辑状态
        editedRow.rowEdit = false;
    };

    resetInput();
}
// 通用重置输入框
const resetInput = () => {
    editRowFlag.value = '';
    isEditRow.value = false;
};
// 编辑单元格
const confirmEditCell = (scope) => {
    commonCellEditEnsure(scope);
    console.log('自定义-确认编辑-单元格按钮更新啦');
};

const cancelEditCell = (scope) => {
    commonCellEditCancel(scope);
    console.log('自定义-取消编辑-单元格按钮更新啦');
};

// 编辑行
const cancelEditRow = (scope) => {
    commonCellEditCancel(scope);
    console.log('取消编辑-按钮更新啦～');
};

const confirmEditRow = (scope) => {
    commonCellEditEnsure(scope);
    // 可以在这里触发一个事件或调用API来保存更新后的数据
    console.log('确认编辑后，更新数据啦～');
};

const ensureInput = (scope) => {
    console.log('确认输入:', scope);
    // 这里添加确认输入的逻辑
};

const cancelInput = (scope) => {
    console.log('取消输入:', scope);
    editRowFlag.value = '';
};
</script>

<style lang="scss" scoped>
.el-table .cell {
    display: flex;
    align-items: center;
}
</style>
