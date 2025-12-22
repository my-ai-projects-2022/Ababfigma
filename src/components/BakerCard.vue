<template>
  <view class="baker-card" @tap="handleClick">
    <view class="card-content">
      <!-- 头像区域 -->
      <view class="avatar-wrapper">
        <image :src="baker.avatar" class="avatar" mode="aspectFill" />
        <view class="status-dot" :class="{ active: baker.isOpen }" />
      </view>
      
      <!-- 信息区域 -->
      <view class="info-wrapper">
        <!-- 名称和距离 -->
        <view class="header-row">
          <text class="baker-name">{{ baker.name }}</text>
          <view class="distance-wrapper">
            <text class="distance-icon">📍</text>
            <text class="distance">{{ baker.distance }}km</text>
          </view>
        </view>
        
        <!-- 面包标签 -->
        <view class="bread-tags">
          <view
            v-for="(bread, index) in displayBreads"
            :key="index"
            class="bread-tag"
          >
            <text class="bread-text">{{ bread }}</text>
            <!-- Hot 标签 -->
            <view v-if="index === 0" class="tag-badge hot">
              <text class="badge-text">🔥</text>
            </view>
            <!-- New 标签 -->
            <view v-if="index === displayBreads.length - 1 && displayBreads.length > 1" class="tag-badge new">
              <text class="badge-text">✨</text>
            </view>
          </view>
        </view>
        
        <!-- 营业状态 -->
        <view class="status-row">
          <view class="status-icon" :class="{ active: baker.isOpen }">
            <text class="bulb">💡</text>
          </view>
          <text class="status-text" :class="{ active: baker.isOpen }">
            {{ baker.isOpen ? '营业中' : '休息中' }}
          </text>
        </view>
      </view>
      
      <!-- 箭头 -->
      <view class="arrow">
        <text class="arrow-icon">›</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface Baker {
  id: string;
  name: string;
  avatar: string;
  distance: number;
  breads: string[];
  isOpen: boolean;
}

interface Props {
  baker: Baker;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [id: string];
}>();

const displayBreads = computed(() => props.baker.breads.slice(0, 3));

const handleClick = () => {
  emit('click', props.baker.id);
};
</script>

<style scoped>
.baker-card {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 32rpx;
  margin: 0 32rpx 24rpx;
  transition: transform 0.2s;
}

.baker-card:active {
  transform: scale(0.98);
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

/* 头像区域 */
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
}

.status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  border: 4rpx solid #FFFFFF;
  background-color: #7F8C8D;
}

.status-dot.active {
  background-color: #27AE60;
}

/* 信息区域 */
.info-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.baker-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #2C3E50;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.distance-wrapper {
  display: flex;
  align-items: center;
  gap: 8rpx;
  flex-shrink: 0;
}

.distance-icon {
  font-size: 28rpx;
  opacity: 0.6;
}

.distance {
  font-size: 28rpx;
  color: #7F8C8D;
}

/* 面包标签 */
.bread-tags {
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;
}

.bread-tag {
  position: relative;
  padding: 8rpx 16rpx;
  background-color: #F9F7F3;
  border-radius: 12rpx;
  display: inline-flex;
  align-items: center;
}

.bread-text {
  font-size: 24rpx;
  color: #E67E22;
}

.tag-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.tag-badge.hot {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
}

.tag-badge.new {
  background: linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%);
}

.badge-text {
  font-size: 20rpx;
}

/* 营业状态 */
.status-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 4rpx;
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.status-icon .bulb {
  filter: grayscale(100%) brightness(0.8);
  opacity: 0.5;
}

.status-icon.active .bulb {
  filter: none;
  opacity: 1;
}

.status-text {
  font-size: 24rpx;
  color: #7F8C8D;
}

.status-text.active {
  color: #27AE60;
}

/* 箭头 */
.arrow {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.arrow-icon {
  font-size: 48rpx;
  color: #7F8C8D;
  font-weight: 300;
}
</style>
