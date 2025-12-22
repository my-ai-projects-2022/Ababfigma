<template>
  <view class="page">
    <view class="container">
      <text class="title">订单页面</text>
      <text class="subtitle">功能开发中...</text>
    </view>
    <BottomNav :active="'orders'" @change="handleNavChange" />
  </view>
</template>

<script setup lang="ts">
import BottomNav from '../../components/BottomNav.vue';

type NavItem = 'home' | 'orders' | 'profile';

const handleNavChange = (item: NavItem) => {
  console.log('切换到:', item);
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #F9F7F3;
}

.container {
  padding: 96rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
}

.title {
  font-size: 48rpx;
  font-weight: 600;
  color: #2C3E50;
}

.subtitle {
  font-size: 28rpx;
  color: #7F8C8D;
}
</style>
