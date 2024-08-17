<template>
    <div class="mi-modal-form-wrapper">
        <el-dialog v-model="dialogVisible" v-bind="$attrs">
            <template #default>
                <MiForm
                    ref="form"
                    :options="options"
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
                    <!-- 内部是插槽，该组件往外又将其暴漏为插槽 -->
                    <template #uploadArea>
                        <!-- 触发上传操作的载体 -->
                        <slot name="uploadArea"></slot>
                    </template>
                    <template #uploadTip>
                        <!-- 上传的提示 -->
                        <slot name="uploadTip"></slot>
                    </template>
                </MiForm>
            </template>
            <template #footer>
                <!-- 底部点击确认的时候，就需要去做表单的验证能力，方法是通过插槽的方法分发出去 -->
                <!-- 在 vue3 中父组件获取子组件的示例，不能直接获取，而是通过子组件 expose 的方式分发出去 -->
                <slot name="footerContent" :form="form"></slot>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from 'vue';
import { FormOptions } from '@/types/form.ts';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true,
    },
    handlePreview: {
        type: Function as PropType<(file: any) => void>,
    },
    handleRemove: {
        type: Function as PropType<(file: any) => void>,
    },
    beforeRemove: {
        type: Function as PropType<
            (file: any, fileList: any[]) => Promise<boolean> | boolean
        >,
    },
    handleSuccess: {
        type: Function as PropType<(res: any) => void>,
    },
    handleError: {
        type: Function as PropType<(err: Error) => void>,
    },
    handleProgress: {
        type: Function as PropType<(event: any) => void>,
    },
    handleChange: {
        type: Function as PropType<(file: any, fileList: any[]) => void>,
    },
    handeleBeforeUpload: {
        type: Function as PropType<(file: any) => Promise<boolean> | boolean>,
    },
});

const emit = defineEmits(['update:visible']);
const dialogVisible = ref(false);
const form = ref();
watch(
    () => props.visible,
    (val) => {
        dialogVisible.value = val;
    }
);

watch(
    () => dialogVisible.value,
    (val) => {
        emit('update:visible', val);
    }
);
</script>
