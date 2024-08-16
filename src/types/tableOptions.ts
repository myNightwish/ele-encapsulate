export interface tableOptions {
  label: String,
  prop?: String,
  colWidth?: String | Number,
  align?: 'left' | 'center' | 'right',
  slot?: String,
  // 是否为操作项
  action?: Boolean,
  editable?: Boolean,
}