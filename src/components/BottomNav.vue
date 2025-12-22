<template>
  <view class="bottom-nav">
    <view class="nav-item" :class="{ active: active === 'home' }" @tap="handleChange('home')">
      <view class="nav-icon">
        <text v-if="active === 'home'">🏠</text>
        <text v-else>🏘️</text>
      </view>
      <text class="nav-text">首页</text>
    </view>
    
    <view class="nav-item" :class="{ active: active === 'orders' }" @tap="handleChange('orders')">
      <view class="nav-icon">
        <text v-if="active === 'orders'">📦</text>
        <text v-else>📭</text>
      </view>
      <text class="nav-text">订单</text>
    </view>
    
    <view class="nav-item" :class="{ active: active === 'profile' }" @tap="handleChange('profile')">
      <view class="nav-icon">
        <text v-if="active === 'profile'">👤</text>
        <text v-else>👥</text>
      </view>
      <text class="nav-text">我的</text>
    </view>
  </view>
</template>

<script setup lang="ts">
type NavItem = 'home' | 'orders' | 'profile';

interface Props {
  active: NavItem;
}

const props = withDefaults(defineProps<Props>(), {
  active: 'home'
});

const emit = defineEmits<{
  change: [item: NavItem];
}>();

const handleChange = (item: NavItem) => {
  emit('change', item);
  
  // 路由跳转
  const routes: Record<NavItem, string> = {
    home: '/pages/index/index',
    orders: '/pages/orders/index',
    profile: '/pages/profile/index'
  };
  
  if (item !== props.active) {
    uni.switchTab({
      url: routes[item]
    });
  }
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 128rpx;
  background-color: #FFFFFF;
  border-top: 1rpx solid #ECF0F1;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 999;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  height: 100%;
  transition: all 0.3s;
}

.nav-icon {
  font-size: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  font-size: 24rpx;
  color: #7F8C8D;
}

.nav-item.active .nav-text {
  color: #E67E22;
  font-weight: 600;
}
</style>
