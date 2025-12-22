import React from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LoginModal({ onClose, onConfirm }: LoginModalProps) {
  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="login-modal-body">
          <div className="login-modal-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="28" r="16" fill="#E67E22"/>
              <path d="M16 72C16 56.536 26.746 44 40 44C53.254 44 64 56.536 64 72" stroke="#E67E22" strokeWidth="4" fill="none"/>
            </svg>
          </div>

          <h2 className="login-modal-title">欢迎来到面包工坊</h2>
          <p className="login-modal-message">
            登录后可以享受更多服务
          </p>

          <div className="login-modal-features">
            <div className="login-feature-item">✓ 收藏喜欢的主理人</div>
            <div className="login-feature-item">✓ 喜欢心仪的面包</div>
            <div className="login-feature-item">✓ 管理收货地址</div>
            <div className="login-feature-item">✓ 问题反馈与咨询</div>
          </div>

          <div className="login-modal-actions">
            <button className="login-modal-cancel" onClick={onClose}>
              取消
            </button>
            <button className="login-modal-confirm" onClick={onConfirm}>
              授权登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
