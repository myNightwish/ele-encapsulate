<template>
    <div class="ModalFormDemo">
        <!-- 注意不是 v-model=“visible” -->
        <MiModalForm
            v-model:visible="visible"
            title="编辑用户"
            width="50%"
            :options="formConfig"
        >
            <!-- 插槽套插槽的方式 -->
            <template #uploadArea>
                <el-button type="primary">点击上传</el-button>
            </template>
            <template #uploadTip>
                <div :style="{ color: 'pink' }">
                    jpg/png files with a size less than 500KB.
                </div>
            </template>
            <template #footerContent="scope">
                <div class="dialog-footer">
                    <el-button @click="cancel(scope)">取消</el-button>
                    <el-button type="primary" @click="ensure(scope)">
                        确认
                    </el-button>
                </div>
            </template>
        </MiModalForm>
        <el-button @click="openForm">打开弹窗</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { formConfig } from '@/config/formConfig';
import { ElMessage } from 'element-plus';

const visible = ref(false);

const openForm = () => {
    visible.value = true;
};

const cancel = (scope) => {
    scope.form.selfResetFilds();
};

const ensure = (scope) => {
    const validate = scope.form.validate();
    validate((valid) => {
        if (valid) {
            ElMessage.success('验证成功');
            // 拿到了表单数据 scope.form.getFormData()
        } else {
            ElMessage.error('验证成功');
        }
    });
};
</script>
