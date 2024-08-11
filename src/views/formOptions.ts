import {FormOptions} from '@/types/form.ts';

export const options: FormOptions[] = [
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
        // 下拉框 没有 blur 的概念，是依靠筛选值
        trigger: 'change',
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