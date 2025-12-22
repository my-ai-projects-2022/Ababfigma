import React, { useState } from 'react';
import { Settings, QrCode, ArrowLeftRight, Edit, LogOut, X, Award } from 'lucide-react';
import BakerBottomNav, { type BakerNavItem } from './BakerBottomNav';
import EditBakerInfoModal from './EditBakerInfoModal';
import PaymentQRCodeModal from './PaymentQRCodeModal';
import type { BakerFormData } from './BecomeBakerModal';

interface BakerProfilePageProps {
  onNavChange: (item: BakerNavItem) => void;
  onSwitchToUser: () => void;
  onLogout: () => void;
  bakerInfo: BakerFormData;
  onUpdateBakerInfo: (data: BakerFormData) => void;
  onAchievementsClick?: () => void;
}

export default function BakerProfilePage({
  onNavChange,
  onSwitchToUser,
  onLogout,
  bakerInfo,
  onUpdateBakerInfo,
  onAchievementsClick,
}: BakerProfilePageProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isAcceptingOrders, setIsAcceptingOrders] = useState(true);
  const [paymentQRCode, setPaymentQRCode] = useState('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400');

  // 模拟数据
  const statsData = {
    todayOrders: 12,
    pendingOrders: 5,
    todayIncome: 1280.50,
    totalIncome: 45678.90,
  };

  const handleLogoutClick = () => {
    setShowSettings(false);
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const handleEditClick = () => {
    setShowSettings(false);
    setShowEditModal(true);
  };

  const handleUpdateInfo = (data: BakerFormData) => {
    onUpdateBakerInfo(data);
    setShowEditModal(false);
  };

  const handleUpdatePayment = (qrCodeUrl: string) => {
    setPaymentQRCode(qrCodeUrl);
    setShowPaymentModal(false);
  };

  const handleToggleOrders = () => {
    setIsAcceptingOrders(prev => !prev);
  };

  return (
    <div className="baker-profile-page">
      {/* 顶部状态栏 */}
      <div className="baker-profile-header">
        {/* 店铺信息 */}
        <div className="baker-profile-user-section">
          <div className="baker-profile-user-info">
            <img
              src={bakerInfo.avatar}
              alt={bakerInfo.name}
              className="baker-profile-avatar"
            />
            <div className="baker-profile-user-details">
              <div className="baker-profile-name-row">
                <div className="baker-profile-name">{bakerInfo.name}</div>
                {/* 接单状态开关 */}
                <div className="baker-order-status-inline">
                  <button
                    className={`baker-order-toggle-inline ${isAcceptingOrders ? 'active' : 'inactive'}`}
                    onClick={handleToggleOrders}
                  >
                    <div className="baker-order-toggle-knob-inline" />
                  </button>
                  <span className={`baker-order-status-text-inline ${isAcceptingOrders ? 'active' : 'inactive'}`}>
                    {isAcceptingOrders ? '营业中' : '休息中'}
                  </span>
                </div>
              </div>
              <div className="baker-profile-specialties">
                <span className="baker-profile-specialty-label">主营：</span>
                {bakerInfo.specialties.join('、')}
              </div>
            </div>
          </div>
          <button
            className="baker-profile-settings-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={24} />
          </button>
        </div>

        {/* 快捷操作按钮 */}
        <div className="baker-profile-quick-actions">
          <button className="baker-quick-action-btn" onClick={() => setShowPaymentModal(true)}>
            <QrCode size={20} />
            <span>收款码</span>
          </button>
          <button className="baker-quick-action-btn" onClick={onSwitchToUser}>
            <ArrowLeftRight size={20} />
            <span>切换用户</span>
          </button>
          {onAchievementsClick && (
            <button className="baker-quick-action-btn" onClick={onAchievementsClick}>
              <Award size={20} />
              <span>成就</span>
            </button>
          )}
        </div>
      </div>

      {/* 数据概览 */}
      <div className="baker-stats-section">
        <div className="baker-stats-title">数据看板</div>
        <div className="baker-stats-grid">
          <div className="baker-stat-card">
            <div className="baker-stat-value">{statsData.todayOrders}</div>
            <div className="baker-stat-label">今日订单数</div>
          </div>
          <div className="baker-stat-card">
            <div className="baker-stat-value">{statsData.pendingOrders}</div>
            <div className="baker-stat-label">待处理订单</div>
          </div>
          <div className="baker-stat-card">
            <div className="baker-stat-value">¥{statsData.todayIncome.toFixed(2)}</div>
            <div className="baker-stat-label">今日收入</div>
          </div>
          <div className="baker-stat-card">
            <div className="baker-stat-value">¥{statsData.totalIncome.toFixed(2)}</div>
            <div className="baker-stat-label">总收入</div>
          </div>
        </div>
      </div>

      {/* 我的成就按钮 */}
      {onAchievementsClick && (
        <div className="baker-achievements-section">
          <button className="baker-achievements-btn" onClick={onAchievementsClick}>
            <div className="baker-achievements-btn-icon">
              <Award size={20} />
            </div>
            <div className="baker-achievements-btn-content">
              <div className="baker-achievements-btn-title">我的成就</div>
              <div className="baker-achievements-btn-desc">查看销售排行榜</div>
            </div>
            <svg className="baker-achievements-btn-arrow" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* 设置菜单 */}
      {showSettings && (
        <div className="baker-settings-overlay" onClick={() => setShowSettings(false)}>
          <div className="baker-settings-menu" onClick={(e) => e.stopPropagation()}>
            <button className="baker-settings-item" onClick={handleEditClick}>
              <Edit size={20} />
              <span>编辑资料</span>
            </button>
            <button className="baker-settings-item logout" onClick={handleLogoutClick}>
              <LogOut size={20} />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      )}

      {/* 退出登录确认弹窗 */}
      {showLogoutConfirm && (
        <div className="baker-logout-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="baker-logout-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="baker-logout-close" onClick={() => setShowLogoutConfirm(false)}>
              <X size={20} />
            </button>
            <div className="baker-logout-content">
              <div className="baker-logout-title">确认退出登录？</div>
              <div className="baker-logout-message">退出后需要重新登录才能继续使用</div>
            </div>
            <div className="baker-logout-actions">
              <button className="baker-logout-cancel" onClick={() => setShowLogoutConfirm(false)}>
                取消
              </button>
              <button className="baker-logout-confirm" onClick={handleConfirmLogout}>
                退出登录
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑主理人信息弹窗 */}
      {showEditModal && (
        <EditBakerInfoModal
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateInfo}
          initialData={bakerInfo}
        />
      )}

      {/* 收款码设置弹窗 */}
      {showPaymentModal && (
        <PaymentQRCodeModal
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handleUpdatePayment}
          currentQRCode={paymentQRCode}
        />
      )}

      {/* 底部导航 */}
      <BakerBottomNav active="profile" onChange={onNavChange} />
    </div>
  );
}