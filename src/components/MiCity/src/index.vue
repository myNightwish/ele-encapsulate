<template>
  <div class="mi-city-wrapper">
    <el-select v-model="province" clearable placeholder="请选择省份" style="width: 240px">
        <el-option
          v-for="item in provinceData"
          :key="item.code"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
      <el-select :disabled="!province" clearable v-model="city" placeholder="请选择市区" style="width: 240px">
        <el-option
        v-for="item in cityOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
        </el-option>
      </el-select>
      <el-select :disabled="!province || !city" clearable v-model="area" placeholder="请选择区域" style="width: 240px">
        <el-option
        v-for="item in areaOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
        </el-option>
      </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import provinceData from '@/mock/city.json';

const province = ref('');
const city = ref('');
const area = ref('');

const selectedCity = computed(() => {
  return provinceData.find(item => item.code === province.value)
})

const cityOptions = computed(() => selectedCity.value?.children ?
selectedCity.value.children : []);

const selectedCityArea = computed(() => {
  return cityOptions.value.find(item => item.code === city.value)
})

const areaOptions = computed(() => selectedCityArea.value?.children ?
selectedCityArea.value.children : []);

watch(province, () => {
  city.value = ''
  area.value = ''
})

watch(city, () => {
  area.value = ''
})
watch(area, val => {
  val && emitCity();
})

const emits = defineEmits(['chooseCity']);

const emitCity = () => {
  emits('chooseCity', {
    province: {
      code: province.value,
      name: selectedCity.value?.name, 
    },
    city: {
      code: city.value,
      name: selectedCityArea.value?.name, 
    }, 
    area: {
      code: area.value,
      name: selectedCityArea.value?.children.find(item => item.code === area.value)?.name, 
    },
  })
}

</script>