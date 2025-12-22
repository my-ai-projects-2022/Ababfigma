import React, { useState } from 'react';
import { ChevronLeft, Clipboard } from 'lucide-react';
import type { Address } from './AddressListPage';

interface AddressEditPageProps {
  onBack: () => void;
  onSave: (address: Omit<Address, 'id'>) => void;
  address?: Address; // 如果提供，则为编辑模式
}

export default function AddressEditPage({ onBack, onSave, address }: AddressEditPageProps) {
  const [name, setName] = useState(address?.name || '');
  const [phone, setPhone] = useState(address?.phone || '');
  const [gender, setGender] = useState<'male' | 'female'>(address?.gender || 'male');
  const [addressText, setAddressText] = useState(address?.address || '');
  const [doorNumber, setDoorNumber] = useState(address?.doorNumber || '');
  const [selectedTag, setSelectedTag] = useState(address?.tag || '');
  const [customTag, setCustomTag] = useState('');
  const [isDefault, setIsDefault] = useState(address?.isDefault || false);

  const predefinedTags = ['公司', '家', '学校'];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAddressText(text);
    } catch (err) {
      alert('粘贴失败，请手动输入地址');
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('请输入联系人姓名');
      return;
    }
    if (!phone.trim()) {
      alert('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号');
      return;
    }
    if (!addressText.trim()) {
      alert('请输入地址');
      return;
    }
    if (!doorNumber.trim()) {
      alert('请输入门牌号');
      return;
    }

    const finalTag = customTag.trim() || selectedTag || '其他';

    onSave({
      name: name.trim(),
      phone: phone.trim(),
      gender,
      address: addressText.trim(),
      doorNumber: doorNumber.trim(),
      tag: finalTag,
      isDefault,
    });
  };

  return (
    <div className="address-edit-page">
      {/* 顶部导航栏 */}
      <div className="page-header">
        <button className="page-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">{address ? '编辑地址' : '新建地址'}</h1>
        <div className="page-header-spacer"></div>
      </div>

      {/* 表单内容 */}
      <div className="address-edit-content">
        <div className="address-edit-form">
          {/* 联系人 */}
          <div className="form-group">
            <label className="form-label">联系人</label>
            <input
              type="text"
              className="form-input"
              placeholder="请输入姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 性别 */}
          <div className="form-group">
            <label className="form-label">性别</label>
            <div className="gender-options">
              <button
                className={`gender-option ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                先生
              </button>
              <button
                className={`gender-option ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                女士
              </button>
            </div>
          </div>

          {/* 手机号 */}
          <div className="form-group">
            <label className="form-label">手机号</label>
            <input
              type="tel"
              className="form-input"
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
            />
          </div>

          {/* 地址 */}
          <div className="form-group">
            <label className="form-label">地址</label>
            <div className="address-input-group">
              <textarea
                className="form-textarea"
                placeholder="请输入详细地址"
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                rows={3}
              />
              <button className="paste-btn" onClick={handlePaste}>
                <Clipboard size={18} />
                <span>粘贴</span>
              </button>
            </div>
          </div>

          {/* 门牌号 */}
          <div className="form-group">
            <label className="form-label">门牌号</label>
            <input
              type="text"
              className="form-input"
              placeholder="如：1栋2单元301室"
              value={doorNumber}
              onChange={(e) => setDoorNumber(e.target.value)}
            />
          </div>

          {/* 标签 */}
          <div className="form-group">
            <label className="form-label">标签</label>
            <div className="tag-options">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-option ${selectedTag === tag && !customTag ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCustomTag('');
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="form-input custom-tag-input"
              placeholder="自定义标签"
              value={customTag}
              onChange={(e) => {
                setCustomTag(e.target.value);
                setSelectedTag('');
              }}
            />
          </div>

          {/* 设为默认 */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              <span>设为默认地址</span>
            </label>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="address-edit-footer">
          <button className="save-address-btn" onClick={handleSubmit}>
            保存地址
          </button>
        </div>
      </div>
    </div>
  );
}
