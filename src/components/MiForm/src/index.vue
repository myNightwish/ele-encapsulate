<template>
  <div class="MiForm-wrapper">
    <el-form v-bind="$attrs" :model="model" :rules="rules">
      <el-form-item
        v-for="(item, index) in options" :key="index"
        :label="item.label"
        :prop="item.prop"
      >
        <component v-bind="item.attrs" :is="`el-${item.type}`"
         v-model="model[item.prop]">
        </component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, PropType, defineProps, ref, onMounted } from 'vue';
import {FormOptions} from '@/types/form.ts';
import cloneDeep from 'lodash/cloneDeep';

defineComponent({
  name: 'MiForm'
})

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
})

let model = ref<any>({});
let rules = ref<any>({});

onMounted(() => {
  let modelCopy: any = {};  
  let rulesCopy: any = {};  

  props.options.map((item: FormOptions) => {
    modelCopy[item.prop!] = item.value;
    rulesCopy[item.prop!] = item.rules;
  });
  // 引用类型需要用到深拷贝，因此引用 loadsh
  model.value = cloneDeep(modelCopy);
  rules.value = cloneDeep(rulesCopy);
  console.log('model---', model.value ,'rules---', rules.value);
})


console.log('props---', props)

</script>
