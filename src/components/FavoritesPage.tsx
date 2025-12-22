import React from 'react';
import { ChevronLeft, User } from 'lucide-react';
import BakerCard from './BakerCard';
import type { Baker } from '../App';

interface FavoritesPageProps {
  onBack: () => void;
  favoriteBakers: Baker[];
  onBakerClick: (id: string) => void;
  isLoggedIn: boolean;
}

export default function FavoritesPage({ onBack, favoriteBakers, onBakerClick, isLoggedIn }: FavoritesPageProps) {
  return (
    <div className="favorites-page">
      {/* 顶部导航栏 */}
      <div className="page-header">
        <button className="page-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">我的收藏</h1>
        <div className="page-header-spacer"></div>
      </div>

      {/* 内容区域 */}
      <div className="favorites-content">
        {isLoggedIn && favoriteBakers.length > 0 ? (
          <div className="favorites-list">
            {favoriteBakers.map((baker) => (
              <BakerCard
                key={baker.id}
                baker={baker}
                onClick={onBakerClick}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <User size={64} className="empty-icon" />
            <p className="empty-text">暂无收藏</p>
            <p className="empty-hint">快去收藏您喜欢的主理人吧</p>
          </div>
        )}
      </div>
    </div>
  );
}
