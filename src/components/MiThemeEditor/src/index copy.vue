<template>
  <div class="mi-theme-editor-wrapper">
    <h4>在线主题定制</h4>
    <div class="theme-content">
      <div>
        <label for="primary-color">主色调</label>
        <input type="color" id="primary-color" v-model="primaryColor" @change="updateTheme('primary-color', primaryColor)" />
      </div>
      <div>
        <label for="secondary-color">次色调</label>
        <input type="color" id="secondary-color" v-model="secondaryColor" @change="updateTheme('secondary-color', secondaryColor)" />
      </div>
      <div>
        <label for="text-color">文字颜色</label>
        <input type="color" id="text-color" v-model="textColor" @change="updateTheme('text-color', textColor)" />
      </div>
      <div>
        <label for="background-color">背景颜色</label>
        <input type="color" id="background-color" v-model="backgroundColor" @change="updateTheme('background-color', backgroundColor)" />
      </div>
      <el-button @click="saveTheme">保存主题</el-button>
      <el-button @click="loadTheme">加载主题</el-button>
      <el-button @click="toggleDarkMode">{{ isDarkMode ? '切换到白天模式' : '切换到暗黑模式' }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const primaryColor = ref('#409EFF');
const secondaryColor = ref('#67C23A');
const textColor = ref('#303133');
const backgroundColor = ref('#FFFFFF');
const isDarkMode = ref(false);

const updateTheme = (variable, value) => {
  console.log('dd', variable, value)
  document.documentElement.style.setProperty(`--${variable}`, value);
};

const saveTheme = () => {
  const theme = {
    primaryColor: primaryColor.value,
    secondaryColor: secondaryColor.value,
    textColor: textColor.value,
    backgroundColor: backgroundColor.value,
    isDarkMode: isDarkMode.value,
  };
  localStorage.setItem('customTheme', JSON.stringify(theme));
};

const loadTheme = () => {
  const theme = JSON.parse(localStorage.getItem('customTheme'));
  if (theme) {
    primaryColor.value = theme.primaryColor;
    secondaryColor.value = theme.secondaryColor;
    textColor.value = theme.textColor;
    backgroundColor.value = theme.backgroundColor;
    isDarkMode.value = theme.isDarkMode;
    applyTheme();
  }
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    backgroundColor.value = '#1E1E1E';
    secondaryColor.value = '#333';
    textColor.value = '#FFFFFF';
  } else {
    backgroundColor.value = '#fff';
    secondaryColor.value = "#ccc";
    textColor.value = '#303133';
  }
  applyTheme();
};
const applyTheme = () => {
  updateTheme('primary-color', primaryColor.value);
  updateTheme('secondary-color', secondaryColor.value);
  updateTheme('text-color', textColor.value);
  updateTheme('background-color', backgroundColor.value);
};

// 初次加载时应用主题
applyTheme();
</script>

<style lang="scss" scoped>
.mi-theme-editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  color: var(--text-color);

  .theme-content {
    display: flex;
    // flex-direction: column;
    gap: 10px;
  }
}
input {
  margin-left: 15px;
}
</style>
