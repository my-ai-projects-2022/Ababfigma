import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface CartBarProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
  onCartClick: () => void;
}

export default function CartBar({ totalItems, totalPrice, onCheckout, onCartClick }: CartBarProps) {
  const hasItems = totalItems > 0;

  const handleCartClick = () => {
    // 只有在有商品时才打开购物车弹窗
    if (hasItems) {
      onCartClick();
    }
  };

  return (
    <div className={`detail-cart-bar ${hasItems ? 'active' : ''}`}>
      <div className="detail-cart-info">
        <div className="detail-cart-icon-wrapper" onClick={handleCartClick}>
          <ShoppingBag className="detail-cart-icon" size={24} />
          {hasItems && (
            <div className="detail-cart-badge">{totalItems > 99 ? '99+' : totalItems}</div>
          )}
        </div>
        <div className="detail-cart-price-info">
          {hasItems ? (
            <>
              <div className="detail-cart-price">¥{totalPrice.toFixed(2)}</div>
              <div className="detail-cart-desc">已选 {totalItems} 件</div>
            </>
          ) : (
            <div className="detail-cart-empty-text">未选商品</div>
          )}
        </div>
      </div>
      
      <button
        className={`detail-checkout-btn ${hasItems ? 'active' : ''}`}
        onClick={onCheckout}
        disabled={!hasItems}
      >
        去结算
      </button>
    </div>
  );
}