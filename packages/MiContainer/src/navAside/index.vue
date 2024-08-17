<template>
    <InfiniteMenu
        :data="asideMenuConfig"
        :defaultActive="$route.path"
        :router="true"
        :collapse="collapse"
        class="el-menu-vertical-wrapper"
    />
</template>

<script setup>
import { asideMenuConfig } from '@/config/asideMenuConfig';

const props = defineProps({
    collapse: {
        type: Boolean,
        default: false,
    },
});
</script>
