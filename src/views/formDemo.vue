<template>
    <MiForm
        :options="formConfig"
        ref="form2"
        label-width="100px"
        @handlePreview="handlePreview"
        @handleRemove="handleRemove"
        @before-remove="beforeRemove"
        @on-success="handleSuccess"
        @on-error="handleError"
        @on-progress="handleProgress"
        @on-change="handleChange"
        @before-upload="handeleBeforeUpload"
    >
        <template #uploadArea>
            <el-button type="primary">点击上传</el-button>
        </template>
        <template #uploadTip>
            <div :style="{ color: 'pink' }">
                jpg/png files with a size less than 500KB.
            </div>
        </template>
        <!-- scope 从子组件分发出来 -->
        <template #action="scope">
            <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
            <el-button type="primary" @click="resetForm">取消</el-button>
        </template>
    </MiForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { formConfig } from '@/config/formConfig';

const form2 = ref();
const onSubmit = (scope) => {
    console.log(' scope.form', scope.form);
    scope.form.validate((valid) => {});
};

const resetForm = (scope) => {
    console.log(' resetForm.form', scope.form, 33, form2, 22, form2.value);

    // 单独处理的上传组件、编辑器都没有被重置，因为富文本内容并没有被还原
    form2.value.selfResetFilds();
};

const handlePreview = (file: any) => {
    console.log(file);
};
const handleRemove = (file: any) => {
    console.log(file);
};
const beforeRemove = (file: any) => {
    console.log(file);
};
const handleSuccess = (res: any, file: any, fileList: any) => {
    console.log(res);
};
const handleError = (err: any, file: any, fileList: any) => {
    console.log(err);
};
const handleProgress = (event: any, file: any) => {
    console.log(event);
};
const handleChange = (file: any, fileList: any) => {
    console.log(file);
};
const handeleBeforeUpload = (file: any, fileList: any) => {
    console.log(file);
};
</script>
