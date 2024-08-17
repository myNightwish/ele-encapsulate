<template>
    <div class="mi-progress-wrapper">
        <el-progress :percentage="increment" v-bind="$attrs"></el-progress>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    percentage: {
        type: Number,
        default: 0,
    },
    isAnimate: {
        type: Boolean,
        default: false,
    },
    lastTime: {
        type: Number,
        default: 1000,
    },
});

let timer = ref(null);
const increment = ref(0);

const emits = defineEmits(['hasReached']);
const speed = Math.ceil(props.percentage / props.lastTime);
onMounted(() => {
    if (props.isAnimate) {
        timer = setInterval(() => {
            if (increment.value >= props.percentage) {
                increment.value = props.percentage;
                emits('hasReached');
                clearInterval(timer);
            } else {
                increment.value += speed;
            }
        }, 1);
    } else {
        increment.value = props.percentage;
    }
});
</script>
