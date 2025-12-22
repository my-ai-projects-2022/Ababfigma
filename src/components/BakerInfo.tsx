import React from 'react';
import { MapPin, BadgeCheck } from 'lucide-react';
import type { BakerDetailData } from './BakerDetail';

interface BakerInfoProps {
  baker: BakerDetailData;
  note?: string;
}

export default function BakerInfo({ baker, note }: BakerInfoProps) {
  const isFar = baker.distance > 10;

  return (
    <div className="detail-baker-info">
      {/* 头像和基本信息 */}
      <div className="detail-info-header">
        <div className="detail-avatar-container">
          <img src={baker.avatar} alt={baker.name} className="detail-baker-avatar" />
          <div className={`detail-avatar-status-dot ${baker.isOpen ? 'open' : 'closed'}`} />
        </div>
        
        <div className="detail-info-main">
          <div className="detail-name-row">
            <h1 className="detail-baker-name">{baker.name}</h1>
            {baker.isVerified && (
              <div className="detail-verified-icon">
                <BadgeCheck size={18} fill="currentColor" strokeWidth={0} />
                <svg className="detail-check-mark" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            {/* 营业状态移到这里 */}
            {/* 营业中状态先注释掉，休息中保留 */}
            {!baker.isOpen && (
              <div className={`detail-business-status-inline ${baker.isOpen ? 'open' : 'closed'}`}>
                {baker.isOpen ? '营业中' : '休息中'}
              </div>
            )}
          </div>
          {/* 备注信息显示在名称下方 */}
          {note && (
            <div className="detail-baker-note">
              备注: {note}
            </div>
          )}
          <div className="detail-sold-count">
            已卖出 <span className="detail-sold-number">{baker.totalSold}</span> 个面包
          </div>
        </div>
      </div>

      {/* 距离和位置 */}
      <div className="detail-location-row">
        <div className="detail-location-info">
          <MapPin size={14} className="detail-location-icon" />
          <span className="detail-distance-text">{baker.distance}km</span>
          <span className="detail-location-divider">·</span>
          <span className="detail-location-text">{baker.location}</span>
        </div>
        {isFar && (
          <div className="detail-far-tag">距离远</div>
        )}
      </div>

      {/* 热卖面包标签 */}
      <div className="detail-hot-breads">
        {baker.hotBreads.map((item, index) => (
          <div key={index} className="detail-hot-bread-tag">
            {item.name}
            <span className="detail-hot-bread-count">
              ({item.count > 100 ? '100+' : item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}