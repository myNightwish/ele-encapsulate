<template>
  <div>
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
      <template #uploadArea>
        <el-button type="primary">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div :style="{'color':'pink'}">
        jpg/png files with a size less than 500KB.
      </div>
      </template>
      <!-- scope 从子组件分发出来 -->
      <template #action="scope">
        <el-button type="primary" @click="onSubmit(scope)">提交</el-button>
        <el-button type="primary" plain @click="resetForm">取消</el-button>
      </template>
    </MiForm>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref} from 'vue';
import {FormOptions} from '@/types/form.ts';

defineComponent({
  name: 'FormDemo'
})
const form = ref();
const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    attrs: {
      clerable: true
    },
    rules: [
      {
        require: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
      {
        require: true,
        Min: 2,
        max: 6,
        message: '用户名长度为2-6位',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    showPassword: true,
    prop: 'password',
    attrs: {
      clerable: true
    },
    rules: [
      {
        require: true,
        message: '请输入密码',
        trigger: 'blur'
      },
      {
        require: true,
        Min: 4,
        max: 8,
        message: '密码长度为2-6位',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'select',
    value: "",
    label: '性别',
    placeholder: '请选择性别',
    prop: 'sex',
    attrs: {
      style: {
        width: '100%'
      },
    },
    rules: [
      {
        message: '请选择性别',
        trigger: 'blur',
        require: true,      
      }
    ],
    children: [
      {
        label: '男',
        value: "1",
        type: 'option'
      },
      {
        label: '女',
        value: "2",
        type: 'option'

      },
      {
        label: '未知',
        value: 3,
        type: 'option'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    label: '爱好',
    prop: 'hobby',
    children: [{
      type: 'checkbox',
      value: '1',
      label: '篮球',
    }, {
      type: 'checkbox',
      value: '2',
      label: '足球',
    }, {
      type: 'checkbox',
      value: '3',
      label: '羽毛球',
    }]
  },
  {
    type: 'radio-group',
    value: '',
    label: '工具',
    prop: 'tools',
    children: [{
      type: 'radio',
      value: '1',
      label: '走路',
    }, {
      type: 'radio',
      value: '2',
      label: '坐车',
    }, {
      type: 'radio',
      value: '3',
      label: '骑车',
    }]
  },
  {
    type: 'upload',
    label: '文件上传',
    prop: 'uploadFile',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      limit: 3,
      multiple: true,
    },
    // 上传组件 没有value，结果是在 upload 的方法中
    rules: [
      {
        message: '请选择要上传的文件',
        require: true,      
      }
    ],
  },
  {
    type: 'editor',
    label: '编辑器',
    prop: 'editor',
    value: '',
    placeholder: '请填写初始化描述内容',
    rules: [
      {
        require: true,
        message: '编辑内容不能为空',
      }
    ]
  }
]
const onSubmit = (scope) => {
  scope.form.validate(valid => {
  })
}
const resetForm = (scope) => {
  // 单独处理的上传组件、编辑器都没有被重置，因为富文本内容并没有被还原
  form.value.selfResetFilds();
}

const handlePreview = (file: any) => {
  console.log(file);
}
const handleRemove = (file: any) => {
  console.log(file);
}
const beforeRemove = (file: any) => {
  console.log(file);
}
const handleSuccess = (res: any, file: any, fileList: any) => {
  console.log(res);
}
const handleError = (err: any, file: any, fileList: any) => {
  console.log(err);
}
const handleProgress = (event: any, file: any) => {
  console.log(event);
}
const handleChange = (file: any, fileList: any) => {
  console.log(file);
}
const handeleBeforeUpload = (file: any, fileList: any) => {
  console.log(file);
}

</script>