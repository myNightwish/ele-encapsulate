<template>
  <div class="MiForm-wrapper">
    <el-form v-if="model" 
      ref="form"
      v-bind="$attrs"
      :model="model"
      :rules="rules"
    >
        <el-form-item
          v-for="(item, index) in options" :key="index"
          :label="item.label"
          :prop="item.prop"
        >
            <template v-if = "item.children && item.children.length">
                <component
                  :placeholder="item.placeholder"
                  v-bind="item.attrs"
                  :is="`el-${item.type}`"
                  v-model="model[item.prop]"
                >
                  <component
                    v-for="(childItem, childIdex) in item.children"
                    :key="childIdex"
                    :label="childItem.label"
                    :is="`el-${childItem.type}`"
                    :value="childItem.value"
                  />
                </component>
            </template>
            <template  v-else>
              <!-- 上传组件需要单独处理 -->
              <div v-if="item.type==='upload'">
                <el-upload
                  v-bind="item.uploadAttrs"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :on-progress="handleProgress"
                  :on-change="handleChange"
                  :before-upload="handeleBeforeUpload"
                >
                    <!-- 触发上传操作的载体 -->
                   <slot name="uploadArea"></slot>
                    <!-- 上传的提示 -->
                   <slot name="uploadTip"></slot>
                </el-upload>
              </div>
              <div v-else-if="item.type === 'editor'">
                <Editor :item="item" @editorChanged="(valueHtml) => editorChanged(item, valueHtml)">{{ item.attrs }}</Editor>
              </div>
              <component
                v-else
                v-bind="item.attrs"
                :is="`el-${item.type}`"
                :placeholder="item.placeholder"
                v-model="model[item.prop!]"
              />
            </template>
        </el-form-item>
        <el-form-item>
          <!-- 如何插槽中触发方法：通过作用域插槽，获取定义的表单实例，让外部获取到 -->
           <!-- 除了示例，还需要拿到值 -->
          <slot name="action" :form="form" :model="model"></slot>
        </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent, PropType, ref, 
  onMounted, watch, defineEmits, defineExpose,
  nextTick
} from 'vue';
import {FormOptions} from '@/types/form.ts';
import cloneDeep from 'lodash/cloneDeep';
import Editor from './editor.vue'

defineComponent({
  name: 'MiForm',
  components: {
    Editor
  }
})

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
})

const model = ref<any>(null);
const rules = ref<any>(null);
// 可以引入 element 的类型，这里省略
const form = ref();

const initFormData = () => {
  if(props.options && props.options.length) {
    let modelCopy: any = {};  
    let rulesCopy: any = {};  

    props.options.map((item: FormOptions) => {
      modelCopy[item.prop!] = item.value;
      rulesCopy[item.prop!] = item.rules;
    });
    // 引用类型需要用到深拷贝，因此引用 loadsh
    model.value = cloneDeep(modelCopy);
    rules.value = cloneDeep(rulesCopy);
  }
}
onMounted(() => {
  initFormData();
})
// props.options 的值可能来源于异步加载
watch(() => props.options, () => {
  initFormData();
})
const emits = defineEmits([
  'handlePreview',
  'handleRemove',
  'beforeRemove',
  'handleSuccess',
  'handleError',
  'handleProgress',
  'handleChange',
  'handeleBeforeUpload'
])
let editorCopyHtml;
const handlePreview = (file: File) => {
  emits('handlePreview', file);
}
const handleRemove = (file: File) => {
  emits('handleRemove', file);
}
const beforeRemove = (file: File) => {
  emits('beforeRemove', file);
}
const handleSuccess = (res: any, file: File, fileList: FileList) => {
  // 上传成功后，更新表单项目
  const uploadItem = props.options.find(item => item.type === 'upload')
  if(uploadItem) {
    model.value[uploadItem.prop!] = {
      res,
      file,
      fileList
    };
  }
  emits('handleSuccess', res, file, fileList);
}
const handleError = (err: any, file: File, fileList: FileList) => {
  emits('handleError', err, file, fileList);
}
const handleProgress = (event: any, file: File) => {
  emits('handleProgress', event, file);
}
const handleChange = (file: File, fileList: FileList) => {
  emits('handleChange', file, fileList);
}
const handeleBeforeUpload = (file: File, fileList: FileList) => {
  emits('handeleBeforeUpload', file, fileList);
}

const editorChanged = (item, valueHtml) => {
  editorCopyHtml = valueHtml;
  // 更新表单数据
  model.value[item.prop!] = valueHtml.value;
}

// 改写的
const selfResetFilds = () => {
  form.value?.resetFields();
  nextTick(() => {
    editorCopyHtml.value = '';
  })
}
// 验证方法
const validate = () => {
  return form.value?.validate;
}

// 分发 modal 数据，不能直接通过 define 的方式直接，而是包成函数,分发方法
// 直接 defineExpose model.value; 会导致获取的原始数据
const getFormData = () => {
  return model.value;
}
// 分发出去
defineExpose({
  selfResetFilds,
  validate,
  getFormData
})
</script>
