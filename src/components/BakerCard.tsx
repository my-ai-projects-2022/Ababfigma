import React from 'react';
import { MapPin, Lightbulb, ChevronRight } from 'lucide-react';

export interface Baker {
  id: string;
  name: string;
  avatar: string;
  distance: number;
  breads: string[];
  isOpen: boolean;
  purchased?: boolean; // 是否购买过
}

interface BakerCardProps {
  baker: Baker;
  onClick: (id: string) => void;
}

export default function BakerCard({ baker, onClick }: BakerCardProps) {
  const displayBreads = baker.breads.slice(0, 3);

  return (
    <div className={`baker-card ${baker.purchased ? 'purchased' : ''}`} onClick={() => onClick(baker.id)}>
      {/* 购买过标记 */}
      {baker.purchased && (
        <div className="purchased-badge">
          <span className="purchased-text">购买过</span>
        </div>
      )}
      
      <div className="card-content">
        {/* 头像区域 */}
        <div className="avatar-wrapper">
          <img src={baker.avatar} alt={baker.name} className="avatar" />
          <div className={`status-dot ${baker.isOpen ? 'active' : ''}`} />
        </div>
        
        {/* 信息区域 */}
        <div className="info-wrapper">
          {/* 名称和距离 */}
          <div className="header-row">
            <span className="baker-name">{baker.name}</span>
            <div className="distance-inline">
              <MapPin className="distance-icon-inline" size={12} />
              <span className="distance-text">{baker.distance}km</span>
            </div>
          </div>
          
          {/* 面包标签 */}
          <div className="bread-tags">
            {displayBreads.map((bread, index) => (
              <div key={index} className="bread-tag">
                <span className="bread-text">{bread}</span>
                {/* Hot 标签 - 第一个面包 */}
                {index === 0 && (
                  <div className="tag-badge hot">
                    <span className="badge-text">Hot</span>
                  </div>
                )}
                {/* New 标签 - 最后一个面包 */}
                {index === displayBreads.length - 1 && displayBreads.length > 1 && (
                  <div className="tag-badge new">
                    <span className="badge-text">New</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 箭头 */}
        <div className="arrow">
          <ChevronRight className="arrow-icon" size={24} />
        </div>
      </div>
    </div>
  );
}