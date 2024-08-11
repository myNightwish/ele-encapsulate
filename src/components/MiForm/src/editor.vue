<template>
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc; height: 100px; overflow-y: hidden;"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 200px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount,
  shallowRef, defineEmits
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = ref('simple');

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});
const emits = defineEmits(['editorChanged']);
// 内容 HTML
const valueHtml = ref('')
valueHtml.value = `<p>${props.item.value}</p>`;
console.log('props.item.value-', props.item)

const toolbarConfig = {};
const editorConfig = { placeholder: props.placeholder || '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = () => {
  emits('editorChanged', valueHtml)
}

</script>