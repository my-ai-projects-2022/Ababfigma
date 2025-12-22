import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import type { Bread } from './BreadCard';

interface CartItem {
  bread: Bread;
  quantity: number;
}

interface CartModalProps {
  items: CartItem[];
  onAdd: (breadId: string) => void;
  onRemove: (breadId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function CartModal({ items, onAdd, onRemove, onClear, onClose }: CartModalProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.bread.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="cart-modal-overlay" onClick={handleOverlayClick}>
      <div className="cart-modal-content">
        <div className="cart-modal-header">
          <h3 className="cart-modal-title">已选商品</h3>
          <button className="cart-modal-clear" onClick={onClear}>
            <Trash2 size={16} />
            <span>清空</span>
          </button>
        </div>

        <div className="cart-modal-list">
          {items.length === 0 ? (
            <div className="cart-modal-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-text">购物车是空的</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.bread.id} className="cart-modal-item">
                <img src={item.bread.image} alt={item.bread.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.bread.name}</div>
                  <div className="cart-item-price">¥{item.bread.price.toFixed(2)}</div>
                </div>
                <div className="cart-item-controls">
                  <button 
                    className="cart-item-btn minus" 
                    onClick={() => onRemove(item.bread.id)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button 
                    className="cart-item-btn plus" 
                    onClick={() => onAdd(item.bread.id)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-modal-footer">
            <div className="cart-modal-total">
              <span className="cart-total-label">已选 {totalItems} 件</span>
              <span className="cart-total-price">¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}