import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import type { Bread } from './BreadCard';

interface BreadDetailModalProps {
  bread: Bread;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  onClose: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

export default function BreadDetailModal({ bread, quantity, onAdd, onRemove, onUpdateQuantity, onClose, onLike, isLiked }: BreadDetailModalProps) {
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 模拟多张图片（实际应该从数据中获取）
  const images = [bread.image, bread.image, bread.image];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onUpdateQuantity(numValue);
    } else if (value === '') {
      onUpdateQuantity(0);
    }
  };

  const handleInputBlur = () => {
    if (inputValue === '' || parseInt(inputValue, 10) === 0) {
      setInputValue('0');
      onUpdateQuantity(0);
    } else {
      setInputValue(quantity.toString());
    }
  };

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const getTagClass = (tag: string) => {
    if (tag === '健康') return 'tag-health';
    if (tag === '全麦') return 'tag-wholegrain';
    return 'tag-default';
  };

  const getCategoryClass = (category: string) => {
    if (category === '甜面包') return 'category-sweet';
    if (category === '咸面包') return 'category-savory';
    return 'category-default';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bread-modal-overlay" onClick={handleOverlayClick}>
      <div className="bread-modal-content">
        <button className="bread-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* 图片轮播 */}
        <div className="bread-modal-images">
          <img 
            src={images[currentImageIndex]} 
            alt={bread.name} 
            className="bread-modal-image" 
          />
          {images.length > 1 && (
            <>
              <div className="bread-modal-dots">
                {images.map((_, index) => (
                  <div 
                    key={index} 
                    className={`bread-modal-dot ${index === currentImageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 详细信息 */}
        <div className="bread-modal-info">
          <div className="bread-modal-header">
            <h2 className="bread-modal-name">{bread.name}</h2>
            <div className="bread-modal-price">¥{bread.price.toFixed(2)}</div>
          </div>

          {bread.isHot && (
            <div className="bread-modal-hot-badge">🔥 热卖商品</div>
          )}

          <div className="bread-modal-tags">
            {bread.isPurchased && (
              <div className="detail-purchased-tag">购买过</div>
            )}
            <div className={`detail-bread-category ${getCategoryClass(bread.category)}`}>
              {bread.category}
            </div>
            {bread.tags.map((tag, index) => (
              <div key={index} className={`detail-bread-tag ${getTagClass(tag)}`}>
                {tag}
              </div>
            ))}
          </div>

          <div className="bread-modal-description">
            <h3 className="bread-modal-section-title">商品介绍</h3>
            <p className="bread-modal-description-text">{bread.description}</p>
          </div>

          <div className="bread-modal-stats">
            <div className="bread-modal-stat">
              <span className="stat-label-text">已售</span>
              <span className="stat-value-text">{bread.soldCount}</span>
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="bread-modal-footer">
          {quantity === 0 ? (
            <button className="bread-modal-want-btn" onClick={onAdd}>
              想吃
            </button>
          ) : (
            <div className="bread-modal-controls">
              <button className="bread-modal-minus" onClick={onRemove}>
                <Minus size={20} />
              </button>
              <input
                type="text"
                className="bread-modal-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <button className="bread-modal-plus" onClick={onAdd}>
                <Plus size={20} />
              </button>
            </div>
          )}
          {onLike && (
            <button className={`bread-modal-like ${isLiked ? 'liked' : ''}`} onClick={onLike}>
              <Heart size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}