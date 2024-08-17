<template>
  <div class="mi-theme-editor-wrapper" :class="{ dark: isDarkMode }">
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
      <!-- 暗黑模式切换按钮 -->
      <div class="dark-mode-toggle" @click="toggleDarkMode">
        <i class="iconfont icon-sun" :class="{ 'slide-right': isDarkMode }"></i>
        <i class="iconfont icon-night" :class="{ 'fade-in': isDarkMode }"></i>
      </div>
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
    // 切换到暗黑模式
    setTimeout(() => {
      backgroundColor.value = '#1E1E1E';
      secondaryColor.value = '#333';
      textColor.value = '#FFFFFF';
      applyTheme();
    }, 500); // 等待图标切换动画完成后再更新主题
  } else {
    // 切换回日间模式
    setTimeout(() => {
      backgroundColor.value = '#FFFFFF';
      secondaryColor.value = "#ccc";
      textColor.value = '#303133';
      applyTheme();
    }, 500); // 等待图标切换动画完成后再更新主题
  }
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
  transition: background-color 0.3s ease, color 0.3s ease;

  .theme-content {
    display: flex;
    gap: 10px;
  }
}

.dark-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;
  background-color: #f0f0f0;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  overflow: hidden; /* 确保图标在滑动时不超出按钮边界 */
  transition: background-color 0.3s ease;
}

.iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s ease, opacity 0.5s ease;
  line-height: 30px; /* 确保与容器高度一致 */
  vertical-align: middle; /* 保持垂直居中 */
}

.icon-sun {
  opacity: 1; /* 初始可见 */
}

.icon-night {
  opacity: 0; /* 初始不可见 */
  transform: translateX(60px) translateY(-50%); /* 初始位置在右侧，保持居中 */
}

.slide-right {
  transform: translateX(60px) translateY(-50%); /* 太阳图标滑动到右侧，保持居中 */
  opacity: 0; /* 太阳图标消失 */
}

.fade-in {
  opacity: 1; /* 月亮图标出现 */
  transform: translate(-50%, -50%);
}

.slide-left {
  transform: translateX(-60px) translateY(-50%); /* 月亮图标滑动到左侧，保持居中 */
}
</style>
