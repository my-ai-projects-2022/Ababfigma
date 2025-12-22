import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface ShareModalProps {
  bakerName: string;
  breads: string[];
  onClose: () => void;
}

export default function ShareModal({ bakerName, breads, onClose }: ShareModalProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 生成分享文案
  const shareText = `发现了一家超棒的面包工坊！\n\n👨‍🍳 ${bakerName}\n🍞 招牌面包：${breads.slice(0, 3).join('、')}${breads.length > 3 ? '等' : ''}\n\n快来看看吧～`;

  // 生成分享链接（当前页面URL）
  const shareUrl = window.location.href;

  // 生成二维码URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;

  // 复制文案
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  // 复制链接
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  // 尝试使用原生分享
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `面包工坊 - ${bakerName}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('分享失败', err);
      }
    }
  };

  return (
    <div className="share-modal-overlay" onClick={handleOverlayClick}>
      <div className="share-modal-content">
        <button className="share-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="share-modal-body">
          <h2 className="share-modal-title">分享给好友</h2>

          {/* 分享文案 */}
          <div className="share-section">
            <div className="share-section-header">
              <span className="share-section-label">分享文案</span>
              <button 
                className={`share-copy-btn ${copiedText ? 'copied' : ''}`}
                onClick={handleCopyText}
              >
                {copiedText ? (
                  <>
                    <Check size={14} />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
            <div className="share-text-box">
              {shareText}
            </div>
          </div>

          {/* 分享链接 */}
          <div className="share-section">
            <div className="share-section-header">
              <span className="share-section-label">分享链接</span>
              <button 
                className={`share-copy-btn ${copiedLink ? 'copied' : ''}`}
                onClick={handleCopyLink}
              >
                {copiedLink ? (
                  <>
                    <Check size={14} />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
            <div className="share-link-box">
              {shareUrl}
            </div>
          </div>

          {/* 二维码 */}
          <div className="share-section">
            <span className="share-section-label">扫码访问</span>
            <div className="share-qrcode">
              <img src={qrCodeUrl} alt="分享二维码" className="share-qrcode-image" />
              <p className="share-qrcode-hint">长按保存图片，在微信中识别二维码</p>
            </div>
          </div>

          {/* 原生分享按钮（如果支持） */}
          {navigator.share && (
            <button className="share-native-btn" onClick={handleNativeShare}>
              <span>分享到微信</span>
            </button>
          )}

          {/* 提示 */}
          {!navigator.share && (
            <div className="share-hint">
              💡 复制文案和链接后，可在微信中发送给好友
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
