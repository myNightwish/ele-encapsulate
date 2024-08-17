<template>
    <el-tabs v-model="activeName" class="mi-tab-wrapper">
        <el-tab-pane
            v-for="(item, index) in list"
            :label="item.title"
            :name="index"
        >
            <el-scrollbar class="scroll-wrapper" style="height: 200px">
                <div
                    v-for="(contentItem, idx) in item.list"
                    :key="idx"
                    class="content-wrapper"
                    @click="clickItem(contentItem, idx)"
                >
                    <div v-if="contentItem.avatar" class="avatar">
                        <el-avatar
                            size="small"
                            :src="contentItem.avatar"
                        ></el-avatar>
                    </div>
                    <div v-if="contentItem.tag" class="content">
                        <div class="title">{{ contentItem.title }}</div>
                        <div class="tag-wrapper">
                            <div class="desc">{{ contentItem.desc }}</div>
                            <el-tag :type="contentItem.type" class="tag">
                                {{ contentItem.tag }}
                            </el-tag>
                        </div>
                    </div>
                    <div v-else class="content">
                        <div class="desc">{{ contentItem.desc }}</div>
                        <div class="time">{{ contentItem.time }}</div>
                    </div>
                </div>
                <div class="actions-wrapper">
                    <el-button
                        v-for="(actionItem, idx) in item.operations"
                        :type="actionItem.type"
                        size="small"
                        @click="actionClick(actionItem, idx)"
                        >{{ actionItem.name }}</el-button
                    >
                </div>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    list: {
        type: Array,
        require: true,
    },
    actions: {
        type: Array,
        default: () => [],
    },
});

const emits = defineEmits(['clickItem', 'clickAction']);
const activeName = ref(0);
const clickItem = (item, index) => {
    emits('clickItem', {
        item,
        index,
    });
};

const actionClick = (item, index) => {
    emits('clickAction', {
        item,
        index,
    });
};
</script>

<style lang="scss" scoped>
.content-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 8px;

    .content {
        .desc {
            display: inline-block;
        }
        .title {
            font-weight: 600;
        }
        .tag-wrapper {
            display: flex;
            gap: 6px;
        }
    }
}
.actions-wrapper {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
}
</style>
