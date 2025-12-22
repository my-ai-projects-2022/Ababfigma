import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';

export interface LikedBread {
  id: string;
  breadId: string;
  breadName: string;
  breadImage: string;
  breadPrice: number;
  bakerName: string;
  bakerId: string;
}

interface LikesPageProps {
  onBack: () => void;
  likedBreads: LikedBread[];
  onBreadClick?: (bakerId: string, breadId: string) => void;
  isLoggedIn: boolean;
}

export default function LikesPage({ onBack, likedBreads, onBreadClick, isLoggedIn }: LikesPageProps) {
  return (
    <div className="likes-page">
      {/* 顶部导航栏 */}
      <div className="page-header">
        <button className="page-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">我的喜欢</h1>
        <div className="page-header-spacer"></div>
      </div>

      {/* 内容区域 */}
      <div className="likes-content">
        {isLoggedIn && likedBreads.length > 0 ? (
          <div className="likes-grid">
            {likedBreads.map((item) => (
              <div
                key={item.id}
                className="like-bread-card"
                onClick={() => onBreadClick?.(item.bakerId, item.breadId)}
              >
                <div className="like-bread-image-wrapper">
                  <img src={item.breadImage} alt={item.breadName} className="like-bread-image" />
                  <div className="like-bread-heart">
                    <Heart size={20} fill="currentColor" />
                  </div>
                </div>
                <div className="like-bread-info">
                  <h3 className="like-bread-name">{item.breadName}</h3>
                  <p className="like-bread-baker">{item.bakerName}</p>
                  <div className="like-bread-price">¥{item.breadPrice.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={64} className="empty-icon" />
            <p className="empty-text">暂无喜欢</p>
            <p className="empty-hint">快去给喜欢的面包点个心吧</p>
          </div>
        )}
      </div>
    </div>
  );
}
