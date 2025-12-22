import React from 'react';
import { ArrowLeft, Trophy, TrendingUp } from 'lucide-react';

interface BreadAchievement {
  id: string;
  breadName: string;
  breadImage: string;
  soldQuantity: number;
  buyerCount: number;
  price: number;
  revenue: number;
}

interface BakerAchievementsPageProps {
  onBack: () => void;
}

export default function BakerAchievementsPage({ onBack }: BakerAchievementsPageProps) {
  // 模拟数据 - 按卖出数量倒序排列
  const achievements: BreadAchievement[] = [
    {
      id: '1',
      breadName: '经典法棍',
      breadImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      soldQuantity: 156,
      buyerCount: 89,
      price: 18.00,
      revenue: 2808.00,
    },
    {
      id: '2',
      breadName: '蔓越莓软欧',
      breadImage: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
      soldQuantity: 134,
      buyerCount: 76,
      price: 22.00,
      revenue: 2948.00,
    },
    {
      id: '3',
      breadName: '抹茶红豆吐司',
      breadImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
      soldQuantity: 128,
      buyerCount: 71,
      price: 26.00,
      revenue: 3328.00,
    },
    {
      id: '4',
      breadName: '全麦核桃面包',
      breadImage: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400',
      soldQuantity: 98,
      buyerCount: 52,
      price: 24.00,
      revenue: 2352.00,
    },
    {
      id: '5',
      breadName: '芝士培根面包',
      breadImage: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
      soldQuantity: 87,
      buyerCount: 48,
      price: 28.00,
      revenue: 2436.00,
    },
    {
      id: '6',
      breadName: '巧克力可颂',
      breadImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      soldQuantity: 76,
      buyerCount: 42,
      price: 16.00,
      revenue: 1216.00,
    },
  ];

  // 总计数据
  const totalSold = achievements.reduce((sum, item) => sum + item.soldQuantity, 0);
  const totalBuyers = achievements.reduce((sum, item) => sum + item.buyerCount, 0);
  const totalRevenue = achievements.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="baker-achievements-page">
      {/* 顶部导航 */}
      <div className="baker-achievements-header">
        <button className="baker-achievements-back" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div className="baker-achievements-title">我的成就</div>
        <div className="baker-achievements-spacer"></div>
      </div>

      {/* 总计统计卡片 */}
      <div className="baker-achievements-summary">
        <div className="baker-achievements-summary-icon">
          <Trophy size={28} />
        </div>
        <div className="baker-achievements-summary-stats">
          <div className="baker-achievements-summary-item">
            <div className="baker-achievements-summary-value">{totalSold}</div>
            <div className="baker-achievements-summary-label">总售出</div>
          </div>
          <div className="baker-achievements-summary-divider"></div>
          <div className="baker-achievements-summary-item">
            <div className="baker-achievements-summary-value">{totalBuyers}</div>
            <div className="baker-achievements-summary-label">购买人数</div>
          </div>
          <div className="baker-achievements-summary-divider"></div>
          <div className="baker-achievements-summary-item">
            <div className="baker-achievements-summary-value">¥{totalRevenue.toFixed(0)}</div>
            <div className="baker-achievements-summary-label">总收入</div>
          </div>
        </div>
      </div>

      {/* 成就列表 */}
      <div className="baker-achievements-content">
        <div className="baker-achievements-list-header">
          <TrendingUp size={16} />
          <span>销量排行榜</span>
        </div>
        <div className="baker-achievements-list">
          {achievements.map((item, index) => (
            <div key={item.id} className="baker-achievement-card">
              {/* 排名徽章 */}
              <div className={`baker-achievement-rank rank-${index + 1}`}>
                {index + 1}
              </div>

              {/* 面包图片 */}
              <img
                src={item.breadImage}
                alt={item.breadName}
                className="baker-achievement-image"
              />

              {/* 面包信息 */}
              <div className="baker-achievement-info">
                <div className="baker-achievement-name">{item.breadName}</div>
                <div className="baker-achievement-stats">
                  <div className="baker-achievement-stat">
                    <span className="baker-achievement-stat-label">售出：</span>
                    <span className="baker-achievement-stat-value primary">{item.soldQuantity}</span>
                  </div>
                  <div className="baker-achievement-stat">
                    <span className="baker-achievement-stat-label">购买人数：</span>
                    <span className="baker-achievement-stat-value">{item.buyerCount}</span>
                  </div>
                </div>
              </div>

              {/* 价格和收入 */}
              <div className="baker-achievement-revenue">
                <div className="baker-achievement-price">¥{item.price.toFixed(2)}</div>
                <div className="baker-achievement-total">
                  总收入
                  <span className="baker-achievement-total-value">¥{item.revenue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}