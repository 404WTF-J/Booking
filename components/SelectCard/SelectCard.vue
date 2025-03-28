<!-- SelectCard.vue -->
<template>
    <view class="card" @click="selectCard">
        <view class="card-content">
            <text class="card-title">{{ title }}</text>
            <text class="card-description">{{ description }}</text>
        </view>
        <view class="card-icon" v-if="isSelected">
            <uni-icons type="check" size="20" color="green"></uni-icons>
        </view>
    </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['select']);

const selectCard = () => {
    emit('select');
};
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.card:hover {
    background-color: #f0f0f0;
}

.card-title {
    font-size: 16px;
    font-weight: bold;
}

.card-description {
    font-size: 14px;
    color: #666;
}

.card-icon {
    display: flex;
    align-items: center;
}
</style>
