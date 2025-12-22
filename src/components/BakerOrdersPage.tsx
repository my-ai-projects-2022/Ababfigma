import React, { useState } from 'react';
import { Award } from 'lucide-react';
import BakerBottomNav, { type BakerNavItem } from './BakerBottomNav';
import OrderDimensionView from './OrderDimensionView';
import BreadDimensionView from './BreadDimensionView';

interface BakerOrdersPageProps {
  onNavChange: (item: BakerNavItem) => void;
  onAchievementsClick?: () => void;
}

type ViewMode = 'order' | 'bread';

export default function BakerOrdersPage({ onNavChange, onAchievementsClick }: BakerOrdersPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('order');

  return (
    <div className="baker-orders-page">
      {/* 顶部标签切换 */}
      <div className="baker-orders-header">
        <div className="baker-orders-title-row">
          <div className="baker-orders-title">订单管理</div>
          {onAchievementsClick && (
            <button className="baker-orders-achievement-btn" onClick={onAchievementsClick}>
              <Award size={20} />
              <span>成就</span>
            </button>
          )}
        </div>
        <div className="baker-orders-tabs">
          <button
            className={`baker-orders-tab ${viewMode === 'order' ? 'active' : ''}`}
            onClick={() => setViewMode('order')}
          >
            订单维度
          </button>
          <button
            className={`baker-orders-tab ${viewMode === 'bread' ? 'active' : ''}`}
            onClick={() => setViewMode('bread')}
          >
            面包维度
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="baker-orders-content">
        {viewMode === 'order' ? <OrderDimensionView /> : <BreadDimensionView />}
      </div>

      {/* 底部导航 */}
      <BakerBottomNav active="orders" onChange={onNavChange} />
    </div>
  );
}