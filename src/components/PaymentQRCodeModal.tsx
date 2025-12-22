import React, { useState } from 'react';
import { X, Upload, QrCode } from 'lucide-react';

interface PaymentQRCodeModalProps {
  onClose: () => void;
  onSubmit: (qrCodeUrl: string) => void;
  currentQRCode?: string;
}

export default function PaymentQRCodeModal({ onClose, onSubmit, currentQRCode = '' }: PaymentQRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState(currentQRCode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadClick = () => {
    // TODO: 实现收款码图片上传功能
    alert('收款码上传功能待实现');
  };

  const handleSubmit = () => {
    if (!qrCodeUrl.trim()) {
      alert('请上传收款码');
      return;
    }

    setIsSubmitting(true);
    onSubmit(qrCodeUrl);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="payment-qrcode-modal-overlay" onClick={handleOverlayClick}>
      <div className="payment-qrcode-modal-content">
        {/* 头部 */}
        <div className="payment-qrcode-modal-header">
          <h2 className="payment-qrcode-modal-title">设置收款码</h2>
          <button className="payment-qrcode-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* 内容 */}
        <div className="payment-qrcode-modal-body">
          <div className="payment-qrcode-upload-container">
            {qrCodeUrl ? (
              <div className="payment-qrcode-preview">
                <img src={qrCodeUrl} alt="收款码" className="payment-qrcode-image" />
                <button className="payment-qrcode-reupload" onClick={handleUploadClick}>
                  <Upload size={16} />
                  <span>重新上传</span>
                </button>
              </div>
            ) : (
              <button className="payment-qrcode-upload-btn" onClick={handleUploadClick}>
                <QrCode size={48} />
                <span className="payment-qrcode-upload-text">点击上传收款码</span>
                <span className="payment-qrcode-upload-hint">支持微信、支付宝收款码</span>
              </button>
            )}
          </div>

          <div className="payment-qrcode-tips">
            <div className="payment-qrcode-tips-title">温馨提示</div>
            <ul className="payment-qrcode-tips-list">
              <li>请上传清晰的收款码图片</li>
              <li>支持微信、支付宝等主流支付方式</li>
              <li>收款码仅用于顾客付款，请妥善保管</li>
            </ul>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="payment-qrcode-modal-footer">
          <button className="payment-qrcode-cancel" onClick={onClose}>
            取消
          </button>
          <button 
            className="payment-qrcode-submit" 
            onClick={handleSubmit} 
            disabled={isSubmitting || !qrCodeUrl}
          >
            {isSubmitting ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
