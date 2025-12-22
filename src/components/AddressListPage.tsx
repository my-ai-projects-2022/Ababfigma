import React from 'react';
import { ChevronLeft, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';

export interface Address {
  id: string;
  name: string;
  phone: string;
  gender: 'male' | 'female';
  address: string;
  doorNumber: string;
  tag: string;
  isDefault?: boolean;
}

interface AddressListPageProps {
  onBack: () => void;
  addresses: Address[];
  onAddAddress: () => void;
  onEditAddress: (id: string) => void;
  onDeleteAddress: (id: string) => void;
  isLoggedIn: boolean;
}

export default function AddressListPage({ 
  onBack, 
  addresses, 
  onAddAddress, 
  onEditAddress, 
  onDeleteAddress,
  isLoggedIn 
}: AddressListPageProps) {
  return (
    <div className="address-list-page">
      {/* 顶部导航栏 */}
      <div className="page-header">
        <button className="page-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">我的地址</h1>
        <button className="page-header-action" onClick={onAddAddress}>
          <Plus size={24} />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="address-list-content">
        {isLoggedIn && addresses.length > 0 ? (
          <div className="address-list">
            {addresses.map((address) => (
              <div key={address.id} className="address-card">
                <div className="address-card-header">
                  <div className="address-card-user">
                    <span className="address-user-name">{address.name}</span>
                    <span className="address-user-gender">
                      {address.gender === 'male' ? '先生' : '女士'}
                    </span>
                    <span className="address-user-phone">{address.phone}</span>
                  </div>
                  {address.isDefault && (
                    <span className="address-default-tag">默认</span>
                  )}
                </div>
                <div className="address-card-detail">
                  <MapPin size={16} className="address-icon" />
                  <span className="address-text">
                    {address.address} {address.doorNumber}
                  </span>
                </div>
                <div className="address-card-footer">
                  <span className="address-tag">{address.tag}</span>
                  <div className="address-actions">
                    <button 
                      className="address-action-btn edit"
                      onClick={() => onEditAddress(address.id)}
                    >
                      <Edit2 size={16} />
                      <span>编辑</span>
                    </button>
                    <button 
                      className="address-action-btn delete"
                      onClick={() => {
                        if (window.confirm('确定要删除这个地址吗？')) {
                          onDeleteAddress(address.id);
                        }
                      }}
                    >
                      <Trash2 size={16} />
                      <span>删除</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <MapPin size={64} className="empty-icon" />
            <p className="empty-text">暂无地址</p>
            <p className="empty-hint">点击右上角添加新地址</p>
          </div>
        )}
      </div>
    </div>
  );
}
