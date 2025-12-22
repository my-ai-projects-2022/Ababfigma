import React, { useState } from 'react';
import { ChevronLeft, Send, MessageCircle } from 'lucide-react';

export interface Feedback {
  id: string;
  content: string;
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

interface FeedbackPageProps {
  onBack: () => void;
  feedbacks: Feedback[];
  onSubmitFeedback: (content: string) => void;
  isLoggedIn: boolean;
}

export default function FeedbackPage({ onBack, feedbacks, onSubmitFeedback, isLoggedIn }: FeedbackPageProps) {
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      alert('请输入反馈内容');
      return;
    }
    if (feedbackText.trim().length < 10) {
      alert('反馈内容至少需要10个字');
      return;
    }

    setIsSubmitting(true);

    // 模拟1秒加载时间
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 50% 概率成功或失败
    const isSuccess = Math.random() > 0.5;

    setIsSubmitting(false);

    if (isSuccess) {
      onSubmitFeedback(feedbackText.trim());
      setFeedbackText('');
      alert('反馈提交成功！感谢您的宝贵意见');
    } else {
      alert('提交失败，请稍后重试');
    }
  };

  return (
    <div className="feedback-page">
      {/* 顶部导航栏 */}
      <div className="page-header">
        <button className="page-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">问题反馈</h1>
        <div className="page-header-spacer"></div>
      </div>

      {/* 内容区域 */}
      <div className="feedback-content">
        {/* 反馈输入区 */}
        <div className={`feedback-input-section ${!isLoggedIn ? 'disabled' : ''}`}>
          <textarea
            className="feedback-textarea"
            placeholder={isLoggedIn ? '请输入您的问题或建议...' : '请登录后进行反馈'}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            maxLength={500}
            disabled={!isLoggedIn}
            rows={6}
          />
          <div className="feedback-input-footer">
            <span className="feedback-char-count">
              {feedbackText.length}/500
            </span>
            <button
              className="feedback-submit-btn"
              onClick={handleSubmit}
              disabled={!isLoggedIn || !feedbackText.trim() || isSubmitting}
            >
              <Send size={18} />
              <span>提交反馈</span>
            </button>
          </div>
        </div>

        {/* 历史反馈列表 */}
        <div className="feedback-history-section">
          <h2 className="feedback-history-title">历史反馈</h2>
          {isLoggedIn && feedbacks.length > 0 ? (
            <div className="feedback-list">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="feedback-item">
                  <div className="feedback-item-header">
                    <span className="feedback-item-label">我的反馈</span>
                    <span className="feedback-item-time">{feedback.createdAt}</span>
                  </div>
                  <div className="feedback-item-content">
                    {feedback.content}
                  </div>
                  {feedback.reply && (
                    <div className="feedback-reply">
                      <div className="feedback-reply-header">
                        <span className="feedback-reply-label">官方回复</span>
                        <span className="feedback-reply-time">{feedback.repliedAt}</span>
                      </div>
                      <div className="feedback-reply-content">
                        {feedback.reply}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <MessageCircle size={64} className="empty-icon" />
              <p className="empty-text">暂无反馈记录</p>
              <p className="empty-hint">
                {isLoggedIn ? '您还没有提交过反馈' : '请登录后查看反馈记录'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}