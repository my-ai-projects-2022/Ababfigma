import React, { useState } from 'react';
import { Clock, Edit, Check } from 'lucide-react';

type OrderStatus = 'all' | 'pending' | 'processing' | 'completed' | 'delivered';

interface BreadItem {
  id: string;
  name: string;
  totalCount: number;
  completedCount: number;
}

interface Order {
  id: string;
  orderNumber: string;
  time: string;
  userName: string;
  userAvatar: string;
  breads: BreadItem[];
  pickupTime: string;
  status: 'pending' | 'processing' | 'completed' | 'delivered';
}

// 模拟订单数据
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#2024121601',
    time: '今天 09:30',
    userName: '张小姐',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    breads: [
      { id: 'b1', name: '贝果', totalCount: 3, completedCount: 0 },
      { id: 'b2', name: '土司', totalCount: 5, completedCount: 0 },
    ],
    pickupTime: '今天 15:00',
    status: 'pending',
  },
  {
    id: '2',
    orderNumber: '#2024121602',
    time: '今天 10:15',
    userName: '李先生',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
    breads: [
      { id: 'b3', name: '贝果', totalCount: 2, completedCount: 2 },
      { id: 'b4', name: '可颂', totalCount: 4, completedCount: 2 },
    ],
    pickupTime: '今天 16:00',
    status: 'processing',
  },
  {
    id: '3',
    orderNumber: '#2024121603',
    time: '今天 11:00',
    userName: '王女士',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    breads: [
      { id: 'b5', name: '法棍', totalCount: 2, completedCount: 2 },
      { id: 'b6', name: '欧包', totalCount: 3, completedCount: 3 },
    ],
    pickupTime: '今天 17:00',
    status: 'completed',
  },
];

const statusTabs = [
  { key: 'all' as OrderStatus, label: '全部' },
  { key: 'pending' as OrderStatus, label: '待处理' },
  { key: 'processing' as OrderStatus, label: '制作中' },
  { key: 'completed' as OrderStatus, label: '制作完成' },
  { key: 'delivered' as OrderStatus, label: '已交付' },
];

const statusLabels = {
  pending: '待处理',
  processing: '制作中',
  completed: '全部制作完成',
  delivered: '已交付',
};

const statusColors = {
  pending: '#F39C12',
  processing: '#3498DB',
  completed: '#27AE60',
  delivered: '#95A5A6',
};

export default function OrderDimensionView() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('all');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [editingPickupTime, setEditingPickupTime] = useState<string | null>(null);
  const [tempPickupTime, setTempPickupTime] = useState<string>('');

  // 过滤订单
  const filteredOrders = activeStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeStatus);

  // 完成面包
  const handleCompleteBread = (orderId: string, breadId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id !== orderId) return order;
        
        const updatedBreads = order.breads.map(bread => {
          if (bread.id === breadId && bread.completedCount < bread.totalCount) {
            return { ...bread, completedCount: bread.totalCount };
          }
          return bread;
        });

        // 自动更新订单状态
        const allCompleted = updatedBreads.every(b => b.completedCount === b.totalCount);
        const hasProcessing = updatedBreads.some(b => b.completedCount > 0 && b.completedCount < b.totalCount);
        const hasAnyCompleted = updatedBreads.some(b => b.completedCount > 0);
        
        let newStatus = order.status;
        if (allCompleted) {
          newStatus = 'completed';
        } else if (hasAnyCompleted || hasProcessing) {
          newStatus = 'processing';
        }

        return { ...order, breads: updatedBreads, status: newStatus };
      })
    );
  };

  // 开始编辑取货时间
  const handleEditPickupTime = (orderId: string, currentTime: string) => {
    setEditingPickupTime(orderId);
    setTempPickupTime(currentTime);
  };

  // 提交取货时间
  const handleSubmitPickupTime = (orderId: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, pickupTime: tempPickupTime } : order
      )
    );
    setEditingPickupTime(null);
    setTempPickupTime('');
  };

  // 更新订单状态
  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="order-dimension-view">
      {/* 状态标签页 */}
      <div className="order-status-tabs">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            className={`order-status-tab ${activeStatus === tab.key ? 'active' : ''}`}
            onClick={() => setActiveStatus(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 订单列表 */}
      <div className="order-list">
        {filteredOrders.length === 0 ? (
          <div className="order-empty-state">
            <div className="order-empty-icon">📦</div>
            <div className="order-empty-text">暂无订单</div>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              {/* 订单头部 */}
              <div className="order-card-header">
                <div className="order-number">{order.orderNumber}</div>
                <div className="order-time">{order.time}</div>
              </div>

              {/* 用户信息 */}
              <div className="order-user-info">
                <img src={order.userAvatar} alt={order.userName} className="order-user-avatar" />
                <div className="order-user-name">{order.userName}</div>
              </div>

              {/* 面包列表 */}
              <div className="order-breads-list">
                {order.breads.map(bread => (
                  <div key={bread.id} className="order-bread-item">
                    <div className="order-bread-info">
                      <span className="order-bread-name">{bread.name}</span>
                      <span className="order-bread-count">
                        共{bread.totalCount}个，已完成 {bread.completedCount}个
                      </span>
                    </div>
                    <button
                      className={`order-bread-complete-btn ${bread.completedCount === bread.totalCount ? 'completed' : ''}`}
                      onClick={() => handleCompleteBread(order.id, bread.id)}
                      disabled={bread.completedCount === bread.totalCount}
                    >
                      {bread.completedCount === bread.totalCount ? (
                        <Check size={16} />
                      ) : (
                        '完成'
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* 预计取货时间 */}
              <div className="order-pickup-time">
                <Clock size={16} className="order-pickup-icon" />
                {editingPickupTime === order.id ? (
                  <>
                    <input
                      type="text"
                      value={tempPickupTime}
                      onChange={(e) => setTempPickupTime(e.target.value)}
                      className="order-pickup-input"
                    />
                    <button
                      className="order-pickup-edit-btn submit"
                      onClick={() => handleSubmitPickupTime(order.id)}
                    >
                      提交
                    </button>
                  </>
                ) : (
                  <>
                    <span className="order-pickup-text">预计取货：{order.pickupTime}</span>
                    <button
                      className="order-pickup-edit-btn"
                      onClick={() => handleEditPickupTime(order.id, order.pickupTime)}
                    >
                      <Edit size={14} />
                    </button>
                  </>
                )}
              </div>

              {/* 订单状态 */}
              <div className="order-card-footer">
                <button
                  className="order-status-badge"
                  style={{ backgroundColor: statusColors[order.status] }}
                >
                  {statusLabels[order.status]}
                </button>
                {order.status === 'completed' && (
                  <button
                    className="order-deliver-btn"
                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                  >
                    标记为已交付
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
