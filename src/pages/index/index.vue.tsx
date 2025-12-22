<template>
  <view class="page">
    <!-- 顶部导航 -->
    <TopNav :city="city" @search="handleSearch" />
    
    <!-- 主内容区域 -->
    <scroll-view class="main-content" scroll-y>
      <!-- 视图切换 -->
      <ViewToggle :mode="viewMode" @change="handleViewChange" />
      
      <!-- 列表视图 -->
      <view v-if="viewMode === 'list'" class="list-view">
        <BakerCard
          v-for="baker in filteredBakers"
          :key="baker.id"
          :baker="baker"
          @click="handleBakerClick"
        />
        
        <view v-if="filteredBakers.length === 0" class="empty-state">
          <text class="empty-text">暂无符合条件的主理人</text>
        </view>
      </view>
      
      <!-- 地图视图 -->
      <view v-else class="map-view">
        <view class="map-placeholder">
          <text class="map-icon">🗺️</text>
          <text class="map-title">地图视图</text>
          <text class="map-desc">此功能即将上线</text>
        </view>
      </view>
    </scroll-view>
    
    <!-- 底部导航 -->
    <BottomNav :active="activeNav" @change="handleNavChange" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TopNav from '../../components/TopNav.vue';
import ViewToggle from '../../components/ViewToggle.vue';
import BakerCard from '../../components/BakerCard.vue';
import BottomNav from '../../components/BottomNav.vue';
import type { Baker } from '../../components/BakerCard.vue';

type ViewMode = 'list' | 'map';
type NavItem = 'home' | 'orders' | 'profile';

// 状态管理
const city = ref('上海');
const viewMode = ref<ViewMode>('list');
const activeNav = ref<NavItem>('home');
const searchQuery = ref('');

// 模拟数据
const mockBakers = ref<Baker[]>([
  {
    id: '1',
    name: '麦田工坊',
    avatar: 'https://images.unsplash.com/photo-1748640858029-53c840ef5a1b?w=400',
    distance: 1.2,
    breads: ['可颂', '贝果', '法棍'],
    isOpen: true,
  },
  {
    id: '2',
    name: '小林面包屋',
    avatar: 'https://images.unsplash.com/photo-1693324006655-9858745376ad?w=400',
    distance: 2.5,
    breads: ['吐司', '全麦', '肉松'],
    isOpen: true,
  },
  {
    id: '3',
    name: '阿雅烘焙坊',
    avatar: 'https://images.unsplash.com/photo-1620039423059-58fe9a0ca20a?w=400',
    distance: 3.8,
    breads: ['丹麦', '奶油包', '红豆包'],
    isOpen: false,
  },
  {
    id: '4',
    name: '巴黎香颂',
    avatar: 'https://images.unsplash.com/photo-1519733870-f96bef9bc85f?w=400',
    distance: 4.2,
    breads: ['马卡龙', '泡芙', '可颂'],
    isOpen: true,
  },
  {
    id: '5',
    name: '木村手作',
    avatar: 'https://images.unsplash.com/photo-1643354732515-fc8898682275?w=400',
    distance: 5.0,
    breads: ['欧包', '软欧', '黑麦'],
    isOpen: true,
  },
  {
    id: '6',
    name: '甜蜜时光',
    avatar: 'https://images.unsplash.com/photo-1748640858029-53c840ef5a1b?w=400',
    distance: 5.6,
    breads: ['奶油泡芙', '蛋糕卷', '曲奇'],
    isOpen: false,
  },
]);

// 过滤后的主理人列表
const filteredBakers = computed(() => {
  if (!searchQuery.value.trim()) {
    return mockBakers.value;
  }
  
  return mockBakers.value.filter(
    (baker) =>
      baker.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      baker.breads.some((bread) =>
        bread.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
  );
});

// 搜索处理
const handleSearch = (query: string) => {
  searchQuery.value = query;
};

// 视图切换
const handleViewChange = (mode: ViewMode) => {
  viewMode.value = mode;
};

// 主理人卡片点击
const handleBakerClick = (id: string) => {
  console.log('点击主理人:', id);
  uni.showToast({
    title: '主理人详情即将上线',
    icon: 'none'
  });
};

// 底部导航切换
const handleNavChange = (item: NavItem) => {
  activeNav.value = item;
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #F9F7F3;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-y: scroll;
  padding-bottom: 160rpx;
}

.list-view {
  padding-bottom: 32rpx;
}

.empty-state {
  text-align: center;
  padding: 96rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: #7F8C8D;
}

.map-view {
  margin: 0 32rpx 32rpx;
}

.map-placeholder {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 160rpx 64rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
}

.map-icon {
  font-size: 128rpx;
  opacity: 0.5;
}

.map-title {
  font-size: 32rpx;
  color: #7F8C8D;
  font-weight: 500;
}

.map-desc {
  font-size: 24rpx;
  color: #7F8C8D;
  margin-top: 8rpx;
}
</style>
