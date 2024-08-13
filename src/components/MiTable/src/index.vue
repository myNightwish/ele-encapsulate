<template>
    <el-table :data="props.data" style="width: 100%">
      <template
        v-for="(item, index) in normalOptions"
        :key="index"
      >
        <el-table-column
          v-if="item.slot"
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.colWidth"
        >
          <template #default="scope">
            <slot :name="item.slot" :scope="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :width="item.colWidth"
        >
        </el-table-column>
      </template>
      <el-table-column
        :prop="actionOptions.prop"
        :label="actionOptions.label"
        :align="actionOptions.align"
        :width="actionOptions.colWidth"
      >
        <template #default="scope">
          <slot name="action" :scope="scope"></slot>
        </template>
      </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineComponent, PropType, computed } from 'vue';
import {tableOptions} from '@/types/tableOptions.ts';

defineComponent({
  name: 'MiTable',
})

const props = defineProps({
  options: {
    type: Array as PropType<tableOptions[]>,
    require: true
  },
  // 表单数据
  data: {
    type: Array as PropType<any[]>,
    require: true
  }
})
// 过滤不含操作项的
const normalOptions = computed(() => 
   props.options?.filter(item => !item.action)
)
// 筛选出含有配置项的
const actionOptions = computed(() => 
   props.options?.find(item => item.action)
)
</script>
