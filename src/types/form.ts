import type {RuleItem} from './formRule.ts';
import { CSSProperties } from 'vue';

export interface FormOptions {
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button'
  | 'color-picker' | 'date-picker' | 'input' | 'input-number'
  | 'radio'| 'radio-group' | 'radio-button' | 'rate' | 'select' | 'option'
  | 'slider' | 'switch' | 'time-picker' | 'time-select' | 'transfer' | 'upload'
  | 'editor'
  // 表单的值
  value?: any,
  label?: String,
  // 表单的标识
  prop?: String,
  // 表单的验证规则，基于async-valator 封装的，专门用来表单验证的
  rules?: RuleItem,
  // 表单元素的特有属性
  attrs?: {
    clerable?: Boolean,
    disabled?: Boolean,
    showPassWord?: Boolean,
  },
  // 表单的占位符
  placeholder?: String,
  children?: Array<FormOptions>,
  style?: CSSProperties,
  // 上传组件的属性
  uploadAttrs?: {
    action?: String,
    headers?: Object,
    method?: 'post' | 'put' | 'patch',
    multiple?: Boolean,
    data?: any,
    name?: String,
    withCredentials?: Boolean,
    showFileList?: Boolean,
    drag?: Boolean,
    accept?: String,
    fileList?: any[],
    thumbnailMode?: Boolean,
    listType?: 'text' | 'picture' | 'picture-card',
    disabled?: Boolean,
    autoUpload?: Boolean,
    beforeUpload?: Function,
    onRemove?: Function,
    onChange?: Function,
    onPreview?: Function,
    onSuccess?: Function,
    onError?: Function,
  },
}