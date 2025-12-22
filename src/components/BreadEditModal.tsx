import React, { useState, useRef } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import type { BreadProduct } from './BakerBreadsPage';

interface BreadEditModalProps {
  bread: BreadProduct | null;
  onClose: () => void;
  onSave: (breadData: Omit<BreadProduct, 'id' | 'currentStock'>) => void;
  onDelete?: (id: string) => void;
}

export default function BreadEditModal({
  bread,
  onClose,
  onSave,
  onDelete,
}: BreadEditModalProps) {
  const [formData, setFormData] = useState({
    name: bread?.name || '',
    price: bread?.price?.toString() || '',
    image: bread?.image || '',
    description: bread?.description || '',
    dailyLimit: bread?.dailyLimit?.toString() || '',
    isActive: bread?.isActive ?? true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 实际项目中应该上传到服务器，这里模拟本地预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // 验证表单
    if (!formData.name.trim()) {
      alert('请输入面包名称');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('请输入有效的价格');
      return;
    }
    if (!formData.dailyLimit || parseInt(formData.dailyLimit) <= 0) {
      alert('请输入有效的每日限量');
      return;
    }
    if (!formData.image) {
      alert('请上传面包图片');
      return;
    }

    onSave({
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description.trim(),
      dailyLimit: parseInt(formData.dailyLimit),
      isActive: formData.isActive,
    });
  };

  const handleDelete = () => {
    if (bread && onDelete) {
      onDelete(bread.id);
    }
  };

  return (
    <div className="bread-edit-modal-overlay" onClick={onClose}>
      <div className="bread-edit-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 弹窗头部 */}
        <div className="bread-edit-modal-header">
          <div className="bread-edit-modal-title">
            {bread ? '编辑面包' : '添加面包'}
          </div>
          <button className="bread-edit-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="bread-edit-modal-body">
          {/* 图片上传区域 */}
          <div className="bread-edit-field">
            <label className="bread-edit-label">面包图片</label>
            <div
              className="bread-edit-image-upload"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.image ? (
                <img src={formData.image} alt="预览" className="bread-edit-image-preview" />
              ) : (
                <div className="bread-edit-image-placeholder">
                  <Upload size={32} />
                  <span>点击上传图片</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* 名称输入框 */}
          <div className="bread-edit-field">
            <label className="bread-edit-label">面包名称</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="例如：经典法棍"
              className="bread-edit-input"
            />
          </div>

          {/* 价格输入框 */}
          <div className="bread-edit-field">
            <label className="bread-edit-label">价格（元）</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="例如：18.00"
              className="bread-edit-input"
            />
          </div>

          {/* 每日限量设置 */}
          <div className="bread-edit-field">
            <label className="bread-edit-label">每日限量</label>
            <input
              type="number"
              min="1"
              value={formData.dailyLimit}
              onChange={(e) => handleInputChange('dailyLimit', e.target.value)}
              placeholder="例如：20"
              className="bread-edit-input"
            />
          </div>

          {/* 描述文本框 */}
          <div className="bread-edit-field">
            <label className="bread-edit-label">面包描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="介绍一下这款面包的特色..."
              className="bread-edit-textarea"
              rows={4}
            />
          </div>
        </div>

        {/* 弹窗底部 */}
        <div className="bread-edit-modal-footer">
          {bread && onDelete && (
            <button
              className="bread-edit-delete-btn"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} />
              删除
            </button>
          )}
          <div className="bread-edit-actions">
            <button className="bread-edit-cancel-btn" onClick={onClose}>
              取消
            </button>
            <button className="bread-edit-save-btn" onClick={handleSave}>
              保存
            </button>
          </div>
        </div>
      </div>

      {/* 删除确认对话框 */}
      {showDeleteConfirm && (
        <div className="bread-delete-confirm-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bread-delete-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="bread-delete-confirm-title">确认删除</div>
            <div className="bread-delete-confirm-message">
              确定要删除「{bread?.name}」吗？此操作不可恢复。
            </div>
            <div className="bread-delete-confirm-actions">
              <button
                className="bread-delete-confirm-cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                取消
              </button>
              <button
                className="bread-delete-confirm-delete"
                onClick={handleDelete}
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
