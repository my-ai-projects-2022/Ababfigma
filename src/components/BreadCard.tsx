import React, { useState, useEffect } from 'react';
import { Plus, Minus, Heart } from 'lucide-react';

export interface Bread {
  id: string;
  name: string;
  image: string;
  price: number;
  isHot: boolean;
  isPurchased: boolean;
  category: string;
  tags: string[];
  description: string;
  soldCount: number;
}

interface BreadCardProps {
  bread: Bread;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  onCardClick: () => void;
  onLike?: (event: React.MouseEvent) => void;
  isLiked?: boolean;
}

export default function BreadCard({ bread, quantity, onAdd, onRemove, onUpdateQuantity, onCardClick, onLike, isLiked }: BreadCardProps) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // 只允许输入0和正整数
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onUpdateQuantity(numValue);
    } else if (value === '') {
      onUpdateQuantity(0);
    }
  };

  const handleInputBlur = () => {
    // 失去焦点时，如果是空值或0，清空购物车
    if (inputValue === '' || parseInt(inputValue, 10) === 0) {
      setInputValue('0');
      onUpdateQuantity(0);
    } else {
      setInputValue(quantity.toString());
    }
  };

  // 同步 quantity 变化到 inputValue
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  // 获取标签样式类
  const getTagClass = (tag: string) => {
    if (tag === '健康') return 'tag-health';
    if (tag === '全麦') return 'tag-wholegrain';
    return 'tag-default';
  };

  // 获取分类样式类
  const getCategoryClass = (category: string) => {
    if (category === '甜面包') return 'category-sweet';
    if (category === '咸面包') return 'category-savory';
    return 'category-default';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // 如果点击的是控制按钮区域，不触发卡片点击
    if ((e.target as HTMLElement).closest('.detail-order-controls')) {
      return;
    }
    onCardClick();
  };

  return (
    <div className="detail-bread-card" onClick={handleCardClick}>
      {/* 面包图片 */}
      <div className="detail-bread-image-wrapper">
        <img src={bread.image} alt={bread.name} className="detail-bread-image" />
        {bread.isHot && (
          <div className="detail-hot-tip">热卖</div>
        )}
      </div>

      {/* 面包信息 */}
      <div className="detail-bread-info">
        {/* 名称和价格同一行 */}
        <div className="detail-bread-name-price">
          <div className="detail-bread-name">{bread.name}</div>
          <div className="detail-bread-price">¥{bread.price.toFixed(2)}</div>
        </div>
        
        {/* 分类、标签和购买过 */}
        <div className="detail-bread-tags">
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

        {/* 描述 */}
        <div className="detail-bread-description">{bread.description}</div>

        {/* 预订按钮 */}
        <div className="detail-order-controls">
          {quantity === 0 ? (
            <button className="detail-want-btn" onClick={(e) => { e.stopPropagation(); onAdd(); }}>
              想吃
            </button>
          ) : (
            <div className="detail-quantity-controls" onClick={(e) => e.stopPropagation()}>
              <button className="detail-minus-btn" onClick={onRemove}>
                <Minus size={16} />
              </button>
              <input
                type="text"
                className="detail-quantity-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <button className="detail-plus-btn" onClick={onAdd}>
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>

        {/* 喜欢按钮 */}
        {onLike && (
          <button
            className={`detail-like-btn ${isLiked ? 'liked' : ''}`}
            onClick={(e) => { e.stopPropagation(); onLike(e); }}
          >
            <Heart size={16} />
          </button>
        )}
      </div>
    </div>
  );
}