import React, { useState } from 'react';
import { ChevronLeft, Camera } from 'lucide-react';

export interface UserProfile {
  nickname: string;
  gender: 'male' | 'female';
  avatar: string;
  phone: string;
}

interface EditProfilePageProps {
  onBack: () => void;
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export default function EditProfilePage({ onBack, profile, onSave }: EditProfilePageProps) {
  const [nickname, setNickname] = useState(profile.nickname);
  const [gender, setGender] = useState<'male' | 'female'>(profile.gender);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [phone, setPhone] = useState(profile.phone);

  const handleAvatarClick = () => {
    // TODO: 实现头像上传功能
    alert('头像上传功能待实现');
  };

  const handleSubmit = () => {
    if (!nickname.trim()) {
      alert('请输入昵称');
      return;
    }
    if (nickname.trim().length < 2) {
      alert('昵称至少需要2个字');
      return;
    }
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号');
      return;
    }

    onSave({
      nickname: nickname.trim(),
      gender,
      avatar,
      phone: phone.trim(),
    });
  };

  return (
    <div className="edit-profile-page">
      {/* 顶部导航栏 */}
      <div className="page-header">
        <button className="page-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">编辑资料</h1>
        <div className="page-header-spacer"></div>
      </div>

      {/* 表单内容 */}
      <div className="edit-profile-content">
        <div className="edit-profile-form">
          {/* 头像 */}
          <div className="form-group avatar-group">
            <label className="form-label">头像</label>
            <button className="avatar-upload" onClick={handleAvatarClick}>
              <img src={avatar} alt="头像" className="avatar-preview" />
              <div className="avatar-upload-overlay">
                <Camera size={24} />
              </div>
            </button>
          </div>

          {/* 昵称 */}
          <div className="form-group">
            <label className="form-label">昵称</label>
            <input
              type="text"
              className="form-input"
              placeholder="请输入昵称"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={20}
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
                男
              </button>
              <button
                className={`gender-option ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                女
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
        </div>

        {/* 保存按钮 */}
        <div className="edit-profile-footer">
          <button className="save-profile-btn" onClick={handleSubmit}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
