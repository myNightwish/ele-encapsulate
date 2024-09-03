<template>
    <el-table
        v-bind="$attrs"
        :data="processedData"
        class="tabble-wrapper"
        row-class-name="fggg"
        @row-click="rowClick"
    >
        <template v-for="(item, _) in normalOptions" :key="item.prop">
            <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="item.colWidth"
            >
                <template #header="scope">
                    <div v-if="item.renderHeader">
                        <component :is="item.renderHeader" />
                    </div>
                    <span v-else>{{ item.label }}</span>
                </template>
                <template #default="scope">
                    <template v-if="scope.row.rowEdit">
                        <el-input
                            v-model="scope.row[item.prop]"
                            size="small"
                        ></el-input>
                    </template>
                    <template v-else>
                        <template
                            v-if="isEditingCell(scope.column.id, scope.$index)"
                        >
                            <div class="input-edit-wrapper">
                                <el-input
                                    v-model="scope.row[item.prop]"
                                    size="small"
                                ></el-input>
                                <span
                                    v-if="$slots.editCell"
                                    @click.stop="handleSlotEditCell"
                                    class="self-edit"
                                >
                                    <slot name="editCell" :scope="scope"></slot>
                                </span>
                                <div v-else>
                                    <el-icon
                                        @click.stop="ensureInput(scope)"
                                        class="ensure"
                                        ><Select
                                    /></el-icon>
                                    <el-icon
                                        @click.stop="cancelInput(scope)"
                                        class="cancel"
                                        ><CloseBold
                                    /></el-icon>
                                </div>
                            </div>
                        </template>
                        <div v-else class="edit-wrapper">
                            <slot
                                v-if="item.slot"
                                :name="item.slot"
                                :scope="scope"
                            ></slot>
                            <span v-else>{{ scope.row[item.prop] }}</span>
                            <el-icon
                                v-if="item.editable"
                                @click.stop="
                                    clickEdit(
                                        scope.column.id,
                                        scope.$index,
                                        scope
                                    )"
                                ><Edit/>
                            </el-icon>
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
                <slot
                    v-if="scope.row.rowEdit"
                    name="editRow"
                    :scope="scope"
                ></slot>
                <slot v-else name="action" :scope="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, PropType } from 'vue';
import { Edit, Select, CloseBold } from '@element-plus/icons';
import cloneDeep from 'lodash/cloneDeep';
import { tableOptions } from '@/types/tableOptions.ts';

const props = defineProps({
    options: {
        type: Array as PropType<tableOptions[]>,
        require: true,
        default: () => [],
    },
    // 表单数据
    data: {
        type: Array as PropType<any[]>,
        require: true,
        default: () => [],
    },
    // 表单整体是否为可编辑行
    isEditRow: {
        type: Boolean,
        default: false,
    },
    // 编辑行的按钮标识，哪一行
    editRowFlag: {
        type: String,
        default: '',
    },
});

const emits = defineEmits([
    'ensureInput',
    'cancelInput',
    'update:editRowFlag',
    'update:isEditRow',
    'editingCell'
]);

const copyTableData = ref(cloneDeep(props.data));
const originalRowData = ref<any>({}); // 保存每一行原始数据的快照
const curEdit = ref<string>('');

const normalOptions = computed(() =>
    props.options?.filter((item) => !item.action)
);
const actionOptions = computed(() =>
    props.options?.find((item) => item.action)
);

onMounted(() => updateRowEdit(false));

watch(
    () => props.data,
    (val) => {
        if (val) {
            copyTableData.value = val;
        }
    },
    { deep: true }
);

watch(
    () => props.editRowFlag,
    () => {
        if (!props.isEditRow) return;
        updateRowEdit(false);
    },
    { deep: true }
);
const processedData = computed(() => {
    return copyTableData.value.map((row) => {
        // 遍历每个列配置项，预处理数据
        props.options.forEach((column) => {
            if (column.formatter) {
                row[column.prop] = column.formatter(row[column.prop]);
            }
            if (column.codeMap && row[column.prop]) {
                row[column.prop] = column.codeMap[row[column.prop]] || row[column.prop];
            }
        });
        return row;
    });
});

const updateRowEdit = (flag: boolean) => {
    copyTableData.value.forEach((item) => (item.rowEdit = flag));
};
const resetInput = () => {
    // 恢复按钮到非编辑状态
    curEdit.value = '';
    emits('update:editRowFlag', '');
    emits('update:isEditRow', false);
}

// 包含默认/插槽的两种情况
const commonCellEditEnsure = (scope) => {
    const rowId = scope.row.id;
    // 找到编辑行的数据，并应用编辑后的值
    const editedRow = copyTableData.value.find((row) => row === scope.row);
    if (editedRow) {
        // 更新表格数据，假设你已经在 `scope.row` 中修改了值
        Object.assign(editedRow, scope.row);
        // 保持记录更新
        originalRowData.value[rowId] = { ...scope.row };
        // 确保关闭当前行的编辑状态
        editedRow.rowEdit = false;
    }
    resetInput();
}
const commonCellEditCancel = (scope) => {
    const rowId = scope.row.id;
    const originalData = originalRowData.value[rowId];
    if (originalData) {
        Object.assign(scope.row, originalData); // 恢复数据到编辑之前的状态
        delete originalRowData.value[rowId]; // 清除已恢复的原始数据快照
    }
    resetInput();
}
// 默认
const ensureInput = (scope) => {
    commonCellEditEnsure(scope);
    emits('ensureInput', scope);
};

const cancelInput = (scope) => {
    commonCellEditCancel(scope);
    emits('cancelInput');
};
// 插槽类型
const handleSlotEditCell = () => {
    // 清空当前编辑的单元格标识
    curEdit.value = '';
};
const isEditingCell = (col: string, idx: number) =>
    curEdit.value === `${col}--${idx}`;


const rowClick = (row: any, col: any) => {
    const rowId = row.id;

    if (col.label === actionOptions.value.label && props.isEditRow) {
        // 如果该行没有被编辑过，则保存其原始数据
        if (!originalRowData.value[rowId]) {
            originalRowData.value[rowId] = { ...row }; // 存储当前行的原始数据快照
        }
        row.rowEdit = !row.rowEdit;
        // 这里的设计是为什么？
        if (row.rowEdit) {
            emits('update:editRowFlag', 'edit');
        } else {
            emits('update:editRowFlag', '');
        }
        // 保证只有一行处于编辑状态
        copyTableData.value.forEach((item) => {
            if (item !== row) item.rowEdit = false;
        });
    }
};
const clickEdit = (col: string, idx: number, scope: any) => {
    const rowId = scope.row.id;
    // 如果该行没有被编辑过，则保存其原始数据
    if (!originalRowData.value[rowId]) {
        originalRowData.value[rowId] = { ...scope.row }; // 存储当前行的原始数据快照
    }
    curEdit.value = `${col}--${idx}`;
    scope.row.rowEdit = false; // 确保不激活整行的编辑状态
    emits('editingCell', scope);
};
</script>

<style lang="scss" scoped>
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
