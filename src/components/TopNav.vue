<template>
  <view class="top-nav">
    <view class="header">
      <view class="location">
        <view class="icon-wrapper">
          <text class="icon">📍</text>
        </view>
        <text class="city">{{ city }}</text>
      </view>
    </view>
    
    <view class="search-box">
      <view class="search-icon">🔍</view>
      <input
        class="search-input"
        type="text"
        placeholder="搜索面包或主理人"
        :value="searchValue"
        @input="handleInput"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  city: string;
}

const props = withDefaults(defineProps<Props>(), {
  city: '上海'
});

const emit = defineEmits<{
  search: [query: string];
}>();

const searchValue = ref('');

const handleInput = (e: any) => {
  searchValue.value = e.detail.value;
  emit('search', e.detail.value);
};
</script>

<style scoped>
.top-nav {
  background-color: #FFFFFF;
  border-bottom: 1rpx solid #ECF0F1;
  padding: 24rpx 32rpx;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.location {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 40rpx;
}

.city {
  font-size: 32rpx;
  color: #2C3E50;
  font-weight: 500;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 24rpx;
  font-size: 36rpx;
  z-index: 1;
}

.search-input {
  width: 100%;
  height: 80rpx;
  padding-left: 80rpx;
  padding-right: 32rpx;
  border-radius: 16rpx;
  background-color: #F9F7F3;
  border: 1rpx solid #ECF0F1;
  font-size: 28rpx;
  color: #2C3E50;
}

.search-input::placeholder {
  color: #7F8C8D;
}
</style>
