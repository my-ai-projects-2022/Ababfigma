import React, { useState } from 'react';
import { Settings, ChevronRight, ShoppingBag, Bookmark, Heart, MapPin, MessageCircle, Edit, LogOut, X, ArrowLeftRight } from 'lucide-react';
import BottomNav from './BottomNav';
import BecomeBakerModal from './BecomeBakerModal';
import type { BakerFormData } from './BecomeBakerModal';

type NavItem = 'home' | 'orders' | 'profile';

interface ProfilePageProps {
  onNavChange: (item: NavItem) => void;
  onOrdersClick: () => void;
  onFavoritesClick: () => void;
  onLikesClick: () => void;
  onAddressClick: () => void;
  onFeedbackClick: () => void;
  onEditProfileClick: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onBecomeBaker?: (data: BakerFormData) => void;
  onSwitchToBaker?: () => void;
  userNickname?: string;
  userAvatar?: string;
  userGender?: 'male' | 'female';
}

export default function ProfilePage({ 
  onNavChange, 
  onOrdersClick, 
  onFavoritesClick,
  onLikesClick,
  onAddressClick,
  onFeedbackClick,
  onEditProfileClick,
  isLoggedIn,
  onLogin,
  onLogout,
  onBecomeBaker,
  onSwitchToBaker,
  userNickname = '面包爱好者',
  userAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
  userGender = 'male',
}: ProfilePageProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showBecomeBakerModal, setShowBecomeBakerModal] = useState(false);
  const [isBaker, setIsBaker] = useState(false); // 主理人状态
  
  const handleBecomeBaker = () => {
    setShowBecomeBakerModal(true);
  };

  const handleSwitchToBaker = () => {
    if (onSwitchToBaker) {
      onSwitchToBaker();
    }
  };

  const handleSubmitBakerForm = (data: BakerFormData) => {
    if (onBecomeBaker) {
      onBecomeBaker(data);
      setIsBaker(true);
    }
    setShowBecomeBakerModal(false);
  };

  const handleEdit = () => {
    setShowSettings(false);
    onEditProfileClick();
  };

  const handleLogout = () => {
    setShowSettings(false);
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const menuItems = [
    {
      icon: ShoppingBag,
      label: '我的订单',
      onClick: onOrdersClick,
      disabled: false,
    },
    {
      icon: Bookmark,
      label: '我的收藏',
      onClick: onFavoritesClick,
      disabled: false,
    },
    {
      icon: Heart,
      label: '我的喜欢',
      onClick: onLikesClick,
      disabled: false,
    },
    {
      icon: MapPin,
      label: '我的地址',
      onClick: onAddressClick,
      disabled: false,
    },
    {
      icon: MessageCircle,
      label: '问题反馈',
      onClick: isLoggedIn ? onFeedbackClick : () => {},
      disabled: !isLoggedIn,
    },
  ];

  return (
    <div className="profile-page">
      {/* 顶部用户信息区 */}
      <div className="profile-header">
        <div className="profile-user-section">
          {isLoggedIn ? (
            <>
              {/* 已登录状态 */}
              <div className="profile-user-info">
                <img src={userAvatar} alt={userNickname} className="profile-avatar" />
                <div className="profile-user-details">
                  <div className="profile-nickname">{userNickname}</div>
                  <div className="profile-gender">{userGender === 'male' ? '男' : '女'}</div>
                </div>
              </div>
              <button 
                className="profile-settings-btn"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings size={24} />
              </button>
            </>
          ) : (
            <>
              {/* 未登录状态 */}
              <div className="profile-user-info">
                <div className="profile-avatar-placeholder">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="14" r="8" fill="#999"/>
                    <path d="M8 36C8 28.268 13.373 22 20 22C26.627 22 32 28.268 32 36" stroke="#999" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div className="profile-user-details">
                  <div className="profile-login-prompt">欢迎来到面包工坊</div>
                </div>
              </div>
              <button className="profile-login-btn" onClick={onLogin}>
                立即登录
              </button>
            </>
          )}
        </div>

        {/* 成为主理人和主理人切换按钮 */}
        {isLoggedIn && (
          <div className="profile-baker-buttons">
            {!isBaker && (
              <button className="profile-become-baker-btn-small" onClick={handleBecomeBaker}>
                <span className="baker-btn-text">成为主理人</span>
                <ChevronRight size={16} />
              </button>
            )}
            <button className="profile-switch-baker-btn-small" onClick={handleSwitchToBaker}>
              <span className="baker-btn-text">主理人</span>
              <ArrowLeftRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* 功能菜单列表 */}
      <div className="profile-menu-section">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="profile-menu-item"
              onClick={item.onClick}
              disabled={item.disabled}
            >
              <div className="profile-menu-left">
                <div className="profile-menu-icon">
                  <Icon size={22} />
                </div>
                <span className="profile-menu-label">{item.label}</span>
              </div>
              <ChevronRight size={20} className="profile-menu-arrow" />
            </button>
          );
        })}
      </div>

      {/* 设置下拉菜单 */}
      {showSettings && isLoggedIn && (
        <div className="profile-settings-overlay" onClick={() => setShowSettings(false)}>
          <div className="profile-settings-menu" onClick={(e) => e.stopPropagation()}>
            <div className="profile-settings-header">
              <h3 className="profile-settings-title">设置</h3>
              <button 
                className="profile-settings-close"
                onClick={() => setShowSettings(false)}
              >
                <X size={24} />
              </button>
            </div>
            <button className="profile-settings-item" onClick={handleEdit}>
              <Edit size={20} />
              <span>编辑资料</span>
            </button>
            <button className="profile-settings-item logout" onClick={handleLogout}>
              <LogOut size={20} />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      )}

      {/* 退出登录确认对话框 */}
      {showLogoutConfirm && (
        <div className="profile-logout-confirm-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="profile-logout-confirm-menu" onClick={(e) => e.stopPropagation()}>
            <div className="profile-logout-confirm-header">
              <h3 className="profile-logout-confirm-title">确认退出登录</h3>
              <button 
                className="profile-logout-confirm-close"
                onClick={() => setShowLogoutConfirm(false)}
              >
                <X size={24} />
              </button>
            </div>
            <p className="profile-logout-confirm-message">确定要退出登录吗？</p>
            <div className="profile-logout-confirm-actions">
              <button className="profile-logout-confirm-cancel" onClick={handleCancelLogout}>
                取消
              </button>
              <button className="profile-logout-confirm-logout" onClick={handleConfirmLogout}>
                退出登录
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 成为主理人模态框 */}
      {showBecomeBakerModal && (
        <BecomeBakerModal
          onClose={() => setShowBecomeBakerModal(false)}
          onSubmit={handleSubmitBakerForm}
          currentAvatar={userAvatar}
        />
      )}

      {/* 底部导航 */}
      <BottomNav active="profile" onChange={onNavChange} />
    </div>
  );
}