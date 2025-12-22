import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  bakerName: string;
  totalPrice: number;
  onComplete: () => void;
  onClose: () => void;
}

export default function CheckoutModal({ bakerName, totalPrice, onComplete, onClose }: CheckoutModalProps) {
  const [note, setNote] = useState('');
  const maxNoteLength = 200;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 模拟二维码图片
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=payment';

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxNoteLength) {
      setNote(value);
    }
  };

  return (
    <div className="checkout-modal-overlay" onClick={handleOverlayClick}>
      <div className="checkout-modal-content">
        <button className="checkout-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="checkout-modal-body">
          <h2 className="checkout-modal-title">付款给 {bakerName}</h2>
          
          <div className="checkout-amount">
            <span className="checkout-amount-label">应付金额</span>
            <span className="checkout-amount-value">¥{totalPrice.toFixed(2)}</span>
          </div>

          <div className="checkout-qrcode">
            <img src={qrCodeUrl} alt="收款二维码" className="qrcode-image" />
            <p className="qrcode-hint">使用微信/支付宝扫描二维码付款</p>
          </div>

          <div className="checkout-notice">
            <AlertCircle size={16} className="notice-icon" />
            <p className="notice-desc">暂不支持直接付款，请扫码支付后点击"付款完成"按钮</p>
          </div>

          <div className="checkout-note">
            <label className="note-label">备注</label>
            <textarea
              className="note-input"
              placeholder="选填，最多200个字符"
              value={note}
              onChange={handleNoteChange}
              maxLength={maxNoteLength}
            />
            <div className="note-counter">{note.length}/{maxNoteLength}</div>
          </div>

          <button className="checkout-complete-btn" onClick={onComplete}>
            付款完成
          </button>
        </div>
      </div>
    </div>
  );
}