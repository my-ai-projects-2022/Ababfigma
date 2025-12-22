import React, { useState } from 'react';
import { Check } from 'lucide-react';
import UpdateOrdersModal from './UpdateOrdersModal';

type BreadStatus = 'all' | 'processing' | 'completed';

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

// 模拟面包任务数据
const mockBreadTasks: BreadTask[] = [
  {
    id: '1',
    name: '贝果',
    totalCount: 15,
    completedCount: 5,
    status: 'processing',
    orders: [
      {
        orderId: '1',
        orderNumber: '#2024121601',
        userName: '张小姐',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        userAddress: '武侯区桐梓林',
        count: 3,
        completedCount: 0,
      },
      {
        orderId: '2',
        orderNumber: '#2024121602',
        userName: '李先生',
        userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
        count: 2,
        completedCount: 2,
      },
      {
        orderId: '4',
        orderNumber: '#2024121604',
        userName: '赵女士',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        userAddress: '高新区天府软件园',
        count: 10,
        completedCount: 3,
      },
    ],
  },
  {
    id: '2',
    name: '土司',
    totalCount: 8,
    completedCount: 3,
    status: 'processing',
    orders: [
      {
        orderId: '1',
        orderNumber: '#2024121601',
        userName: '张小姐',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        userAddress: '武侯区桐梓林',
        count: 5,
        completedCount: 0,
      },
      {
        orderId: '5',
        orderNumber: '#2024121605',
        userName: '周先生',
        userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
        count: 3,
        completedCount: 3,
      },
    ],
  },
  {
    id: '3',
    name: '法棍',
    totalCount: 6,
    completedCount: 6,
    status: 'completed',
    orders: [
      {
        orderId: '3',
        orderNumber: '#2024121603',
        userName: '王女士',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        userAddress: '锦江区春熙路',
        count: 2,
        completedCount: 2,
      },
      {
        orderId: '6',
        orderNumber: '#2024121606',
        userName: '吴先生',
        userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
        count: 4,
        completedCount: 4,
      },
    ],
  },
];

const statusTabs = [
  { key: 'all' as BreadStatus, label: '全部' },
  { key: 'processing' as BreadStatus, label: '制作中' },
  { key: 'completed' as BreadStatus, label: '制作完成' },
];

export default function BreadDimensionView() {
  const [activeStatus, setActiveStatus] = useState<BreadStatus>('all');
  const [breadTasks, setBreadTasks] = useState<BreadTask[]>(mockBreadTasks);
  const [selectedBread, setSelectedBread] = useState<BreadTask | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // 过滤面包任务
  const filteredTasks = activeStatus === 'all'
    ? breadTasks
    : breadTasks.filter(task => task.status === activeStatus);

  // 完成面包
  const handleCompleteBread = (breadId: string) => {
    setBreadTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === breadId && task.completedCount < task.totalCount) {
          return {
            ...task,
            completedCount: task.totalCount,
            status: 'completed' as const,
          };
        }
        return task;
      })
    );
  };

  // 更新完成数量
  const handleUpdateCompletedCount = (breadId: string, count: number) => {
    setBreadTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === breadId) {
          const newCount = Math.max(0, Math.min(count, task.totalCount));
          return {
            ...task,
            completedCount: newCount,
            status: newCount === task.totalCount ? 'completed' as const : 'processing' as const,
          };
        }
        return task;
      })
    );
  };

  // 打开更新订单弹窗
  const handleOpenUpdateModal = (bread: BreadTask) => {
    setSelectedBread(bread);
    setShowUpdateModal(true);
  };

  // 更新订单中的面包完成数量
  const handleUpdateOrderBread = (breadId: string, orderId: string, count: number) => {
    setBreadTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === breadId) {
          const updatedOrders = task.orders.map(order => {
            if (order.orderId === orderId) {
              const newCount = Math.max(0, Math.min(count, order.count));
              return { ...order, completedCount: newCount };
            }
            return order;
          });

          // 重新计算总完成数量
          const totalCompleted = updatedOrders.reduce((sum, order) => sum + order.completedCount, 0);

          return {
            ...task,
            orders: updatedOrders,
            completedCount: totalCompleted,
            status: totalCompleted === task.totalCount ? 'completed' as const : 'processing' as const,
          };
        }
        return task;
      })
    );

    // 更新 selectedBread
    if (selectedBread?.id === breadId) {
      const updatedTask = breadTasks.find(t => t.id === breadId);
      if (updatedTask) {
        const updatedOrders = updatedTask.orders.map(order => {
          if (order.orderId === orderId) {
            const newCount = Math.max(0, Math.min(count, order.count));
            return { ...order, completedCount: newCount };
          }
          return order;
        });
        setSelectedBread({ ...updatedTask, orders: updatedOrders });
      }
    }
  };

  return (
    <div className="bread-dimension-view">
      {/* 状态标签页 */}
      <div className="bread-status-tabs">
        {statusTabs.map(tab => (
          <button
            key={tab.key}
            className={`bread-status-tab ${activeStatus === tab.key ? 'active' : ''}`}
            onClick={() => setActiveStatus(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 面包任务列表 */}
      <div className="bread-task-list">
        {filteredTasks.length === 0 ? (
          <div className="bread-empty-state">
            <div className="bread-empty-icon">🥖</div>
            <div className="bread-empty-text">暂无面包任务</div>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="bread-task-card">
              {/* 面包头部 */}
              <div className="bread-task-header">
                <div className="bread-task-title">
                  <span className="bread-task-name">待完成{task.name}</span>
                  <span className="bread-task-total">{task.totalCount}个</span>
                </div>
                <button
                  className={`bread-task-complete-btn ${task.status === 'completed' ? 'completed' : ''}`}
                  onClick={() => handleCompleteBread(task.id)}
                  disabled={task.status === 'completed'}
                >
                  {task.status === 'completed' ? <Check size={16} /> : '完成'}
                </button>
              </div>

              {/* 面包完成进度 */}
              <div className="bread-task-progress">
                <div className="bread-task-progress-label">面包完成进度</div>
                <div className="bread-task-progress-input-group">
                  <span className="bread-task-progress-text">当前完成数量：</span>
                  <input
                    type="number"
                    min="0"
                    max={task.totalCount}
                    value={task.completedCount}
                    onChange={(e) => handleUpdateCompletedCount(task.id, parseInt(e.target.value) || 0)}
                    className="bread-task-progress-input"
                  />
                  <span className="bread-task-progress-total">/ {task.totalCount}</span>
                </div>
                <div className="bread-task-progress-bar">
                  <div
                    className="bread-task-progress-fill"
                    style={{ width: `${(task.completedCount / task.totalCount) * 100}%` }}
                  />
                </div>
              </div>

              {/* 更新订单按钮 */}
              <button
                className="bread-task-update-btn"
                onClick={() => handleOpenUpdateModal(task)}
              >
                更新订单状态
              </button>
            </div>
          ))
        )}
      </div>

      {/* 更新订单弹窗 */}
      {showUpdateModal && selectedBread && (
        <UpdateOrdersModal
          bread={selectedBread}
          onClose={() => setShowUpdateModal(false)}
          onUpdateOrderBread={handleUpdateOrderBread}
        />
      )}
    </div>
  );
}
