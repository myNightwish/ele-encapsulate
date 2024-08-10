<template>
  <div>
    <MiForm :options="options" label-width="auto"></MiForm>
  </div>
</template>


<script lang="ts" setup>
import { defineComponent } from 'vue';
import {FormOptions} from '@/types/form.ts';

defineComponent({
  name: 'FormDemo'
})

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
  }
]

</script>