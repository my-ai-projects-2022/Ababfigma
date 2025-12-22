<template>
  <view class="view-toggle">
    <view class="toggle-container">
      <view
        class="toggle-btn"
        :class="{ active: mode === 'list' }"
        @tap="handleChange('list')"
      >
        <text class="btn-icon">📋</text>
        <text class="btn-text">列表</text>
      </view>
      <view
        class="toggle-btn"
        :class="{ active: mode === 'map' }"
        @tap="handleChange('map')"
      >
        <text class="btn-icon">🗺️</text>
        <text class="btn-text">地图</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type ViewMode = 'list' | 'map';

interface Props {
  mode: ViewMode;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'list'
});

const emit = defineEmits<{
  change: [mode: ViewMode];
}>();

const handleChange = (mode: ViewMode) => {
  emit('change', mode);
};
</script>

<style scoped>
.view-toggle {
  display: flex;
  justify-content: center;
  padding: 32rpx 0;
}

.toggle-container {
  display: inline-flex;
  background-color: #FFFFFF;
  border-radius: 24rpx;
  padding: 8rpx;
  gap: 8rpx;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx 32rpx;
  border-radius: 16rpx;
  transition: all 0.3s;
}

.toggle-btn.active {
  background-color: #E67E22;
}

.btn-icon {
  font-size: 36rpx;
}

.btn-text {
  font-size: 28rpx;
  color: #7F8C8D;
}

.toggle-btn.active .btn-text {
  color: #FFFFFF;
}
</style>
