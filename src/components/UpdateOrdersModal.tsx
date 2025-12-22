import React from 'react';
import { X, Check, MapPin } from 'lucide-react';

interface BreadTask {
  id: string;
  name: string;
  totalCount: number;
  completedCount: number;
  status: 'processing' | 'completed';
  orders: Array<{
    orderId: string;
    orderNumber: string;
    userName: string;
    userAvatar: string;
    userAddress?: string;
    count: number;
    completedCount: number;
  }>;
}

interface UpdateOrdersModalProps {
  bread: BreadTask;
  onClose: () => void;
  onUpdateOrderBread: (breadId: string, orderId: string, count: number) => void;
}

export default function UpdateOrdersModal({
  bread,
  onClose,
  onUpdateOrderBread,
}: UpdateOrdersModalProps) {
  const handleComplete = (orderId: string, count: number) => {
    onUpdateOrderBread(bread.id, orderId, count);
  };

  const handleInputChange = (orderId: string, value: string) => {
    const count = parseInt(value) || 0;
    onUpdateOrderBread(bread.id, orderId, count);
  };

  return (
    <div className="update-orders-modal-overlay" onClick={onClose}>
      <div className="update-orders-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 弹窗头部 */}
        <div className="update-orders-modal-header">
          <div className="update-orders-modal-title">
            更新{bread.name}订单 ({bread.completedCount}/{bread.totalCount})
          </div>
          <button className="update-orders-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 订单列表 */}
        <div className="update-orders-modal-body">
          {bread.orders.map(order => (
            <div key={order.orderId} className="update-order-card">
              {/* 面包信息 */}
              <div className="update-order-bread-info">
                <span className="update-order-bread-name">{bread.name}</span>
                <span className="update-order-bread-count">×{order.count}</span>
              </div>

              {/* 用户信息 */}
              <div className="update-order-user-section">
                <div className="update-order-user-info">
                  <img
                    src={order.userAvatar}
                    alt={order.userName}
                    className="update-order-user-avatar"
                  />
                  <div className="update-order-user-details">
                    <div className="update-order-user-name">{order.userName}</div>
                    <div className="update-order-number">{order.orderNumber}</div>
                  </div>
                </div>
                {order.userAddress && (
                  <div className="update-order-user-address">
                    <MapPin size={14} />
                    <span>{order.userAddress}</span>
                  </div>
                )}
              </div>

              {/* 完成进度 */}
              <div className="update-order-progress-section">
                <div className="update-order-progress-input-group">
                  <span className="update-order-progress-label">完成数量：</span>
                  <input
                    type="number"
                    min="0"
                    max={order.count}
                    value={order.completedCount}
                    onChange={(e) => handleInputChange(order.orderId, e.target.value)}
                    className="update-order-progress-input"
                  />
                  <span className="update-order-progress-total">/ {order.count}</span>
                </div>
                <button
                  className={`update-order-complete-btn ${order.completedCount === order.count ? 'completed' : ''}`}
                  onClick={() => handleComplete(order.orderId, order.count)}
                  disabled={order.completedCount === order.count}
                >
                  {order.completedCount === order.count ? <Check size={16} /> : '完成'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 弹窗底部 */}
        <div className="update-orders-modal-footer">
          <button className="update-orders-close-btn" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
