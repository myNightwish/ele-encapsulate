<template>
    <div class="mi-notify-wrapper">
        <el-popover placement="bottom" :width="300" trigger="click">
            <template #default>
                <slot></slot>
            </template>
            <template #reference>
                <el-badge
                    size="small"
                    class="notify"
                    :value="value"
                    :max="max"
                    :isDot="isDot"
                >
                    <el-icon size="30">
                        <component :is="iconMap[icon]" class="icon" />
                    </el-icon>
                </el-badge>
            </template>
        </el-popover>
    </div>
</template>

<script setup>
import { iconMap } from '@/config/iconPicker.js';

const props = defineProps({
    // 显示的图标
    icon: {
        type: String,
        default: 'bell',
    },
    value: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 99,
    },
    isDot: {
        type: Boolean,
        default: false,
    },
});
</script>

<style lang="scss" scoped>
.trend {
    display: flex;

    .icon {
        width: 1em;
        height: 1em;
    }
}
</style>
