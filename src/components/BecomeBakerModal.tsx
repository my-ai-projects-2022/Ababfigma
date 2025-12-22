import React, { useState } from 'react';
import { X, Camera, MapPin } from 'lucide-react';

export interface BakerFormData {
  name: string;
  avatar: string;
  specialties: string[];
  address: string;
  phone: string;
}

interface BecomeBakerModalProps {
  onClose: () => void;
  onSubmit: (data: BakerFormData) => void;
  currentAvatar: string;
}

// 常见面包种类
const BREAD_TYPES = [
  '法棍',
  '可颂',
  '吐司',
  '欧包',
  '软欧包',
  '贝果',
  '丹麦酥',
  '牛角包',
  '司康',
  '全麦面包',
  '黑麦面包',
  '布里欧修',
  '佛卡夏',
  '肉桂卷',
  '甜甜圈',
  '菠萝包',
];

export default function BecomeBakerModal({ onClose, onSubmit, currentAvatar }: BecomeBakerModalProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(currentAvatar);
  const [selectedBreads, setSelectedBreads] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 错误状态
  const [errors, setErrors] = useState({
    name: '',
    specialties: '',
    address: '',
    phone: '',
  });

  const handleAvatarClick = () => {
    // TODO: 实现头像上传功能
    alert('头像上传功能待实现');
  };

  const toggleBread = (bread: string) => {
    setSelectedBreads(prev => {
      if (prev.includes(bread)) {
        return prev.filter(b => b !== bread);
      } else {
        return [...prev, bread];
      }
    });
    // 清除错误提示
    if (errors.specialties) {
      setErrors(prev => ({ ...prev, specialties: '' }));
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    // 清除错误提示
    if (errors.name && value.trim()) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    // 清除错误提示
    if (errors.address && value.trim()) {
      setErrors(prev => ({ ...prev, address: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    // 清除错误提示
    if (errors.phone && value.trim()) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSubmit = () => {
    // 重置错误
    const newErrors = {
      name: '',
      specialties: '',
      address: '',
      phone: '',
    };

    // 验证表单
    if (!name.trim()) {
      newErrors.name = '请输入主理人名称';
    } else if (name.trim().length < 2) {
      newErrors.name = '至少需要2个字';
    }

    if (selectedBreads.length === 0) {
      newErrors.specialties = '请至少选择一种';
    }

    if (!address.trim()) {
      newErrors.address = '请输入地址';
    }

    if (!phone.trim()) {
      newErrors.phone = '请输入电话号码';
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      newErrors.phone = '请输入正确的手机号';
    }

    // 如果有错误，显示错误信息
    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      return;
    }

    // 提交表单
    setIsSubmitting(true);
    onSubmit({
      name: name.trim(),
      avatar,
      specialties: selectedBreads,
      address: address.trim(),
      phone: phone.trim(),
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="become-baker-modal-overlay" onClick={handleOverlayClick}>
      <div className="become-baker-modal-content">
        {/* 头部 */}
        <div className="become-baker-modal-header">
          <h2 className="become-baker-modal-title">成为主理人</h2>
          <button className="become-baker-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* 表单内容 */}
        <div className="become-baker-modal-body">
          {/* 头像 */}
          <div className="baker-form-group">
            <div className="baker-form-label-row">
              <label className="baker-form-label">头像</label>
            </div>
            <div className="baker-avatar-container">
              <button className="baker-avatar-upload" onClick={handleAvatarClick}>
                <img src={avatar} alt="头像" className="baker-avatar-preview" />
                <div className="baker-avatar-upload-overlay">
                  <Camera size={24} />
                  <span>更换头像</span>
                </div>
              </button>
            </div>
          </div>

          {/* 主理人名称 */}
          <div className="baker-form-group">
            <div className="baker-form-label-row">
              <label className="baker-form-label">主理人名称</label>
              {errors.name && <span className="baker-form-error">{errors.name}</span>}
            </div>
            <input
              type="text"
              className="baker-form-input"
              placeholder="请输入主理人名称"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              maxLength={20}
            />
          </div>

          {/* 擅长的面包 */}
          <div className="baker-form-group">
            <div className="baker-form-label-row">
              <label className="baker-form-label">
                擅长的面包
                <span className="baker-form-hint">（可多选）</span>
              </label>
              {errors.specialties && <span className="baker-form-error">{errors.specialties}</span>}
            </div>
            <div className="baker-bread-grid">
              {BREAD_TYPES.map((bread) => (
                <button
                  key={bread}
                  className={`baker-bread-option ${selectedBreads.includes(bread) ? 'selected' : ''}`}
                  onClick={() => toggleBread(bread)}
                >
                  {bread}
                </button>
              ))}
            </div>
          </div>

          {/* 地址 */}
          <div className="baker-form-group">
            <div className="baker-form-label-row">
              <label className="baker-form-label">地址</label>
              {errors.address && <span className="baker-form-error">{errors.address}</span>}
            </div>
            <textarea
              className="baker-form-textarea"
              placeholder="如：四川省成都市武侯区桐梓林"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              rows={3}
            />
            <div className="baker-address-hint">
              <MapPin size={12} />
              不要写到具体楼层或房间号
            </div>
          </div>

          {/* 电话 */}
          <div className="baker-form-group">
            <div className="baker-form-label-row">
              <label className="baker-form-label">电话</label>
              {errors.phone && <span className="baker-form-error">{errors.phone}</span>}
            </div>
            <input
              type="tel"
              className="baker-form-input"
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              maxLength={11}
            />
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="become-baker-modal-footer">
          <button className="baker-form-cancel" onClick={onClose}>
            取消
          </button>
          <button className="baker-form-submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : '提交申请'}
          </button>
        </div>
      </div>
    </div>
  );
}