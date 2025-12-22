import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BakerBottomNav, { type BakerNavItem } from './BakerBottomNav';
import BreadEditModal from './BreadEditModal';

interface BakerBreadsPageProps {
  onNavChange: (item: BakerNavItem) => void;
}

export interface BreadProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  dailyLimit: number;
  currentStock: number;
  isActive: boolean; // 是否上架
}

// 模拟面包数据
const mockBreads: BreadProduct[] = [
  {
    id: '1',
    name: '经典法棍',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
    description: '传统法式工艺，72小时低温发酵，外脆内软',
    dailyLimit: 20,
    currentStock: 8,
    isActive: true,
  },
  {
    id: '2',
    name: '牛角可颂',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    description: '法国AOP认证黄油，层次分明',
    dailyLimit: 30,
    currentStock: 0,
    isActive: true,
  },
  {
    id: '3',
    name: '全麦软欧包',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
    description: '100%全麦粉，添加坚果和果干，营养丰富',
    dailyLimit: 15,
    currentStock: 5,
    isActive: false,
  },
  {
    id: '4',
    name: '红豆吐司',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    description: '北海道红豆，香甜软糯',
    dailyLimit: 25,
    currentStock: 12,
    isActive: true,
  },
];

export default function BakerBreadsPage({ onNavChange }: BakerBreadsPageProps) {
  const [breads, setBreads] = useState<BreadProduct[]>(mockBreads);
  const [editingBread, setEditingBread] = useState<BreadProduct | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // 切换上架/下架状态
  const handleToggleActive = (id: string) => {
    setBreads(prevBreads =>
      prevBreads.map(bread =>
        bread.id === id ? { ...bread, isActive: !bread.isActive } : bread
      )
    );
  };

  // 打开编辑弹窗
  const handleEditBread = (bread: BreadProduct) => {
    setEditingBread(bread);
    setShowEditModal(true);
  };

  // 打开新建弹窗
  const handleAddBread = () => {
    setEditingBread(null);
    setShowEditModal(true);
  };

  // 保存面包信息
  const handleSaveBread = (breadData: Omit<BreadProduct, 'id' | 'currentStock'>) => {
    if (editingBread) {
      // 编辑现有面包
      setBreads(prevBreads =>
        prevBreads.map(bread =>
          bread.id === editingBread.id
            ? { ...breadData, id: editingBread.id, currentStock: bread.currentStock }
            : bread
        )
      );
    } else {
      // 新建面包
      const newBread: BreadProduct = {
        ...breadData,
        id: Date.now().toString(),
        currentStock: breadData.dailyLimit,
      };
      setBreads(prevBreads => [newBread, ...prevBreads]);
    }
    setShowEditModal(false);
    setEditingBread(null);
  };

  // 删除面包
  const handleDeleteBread = (id: string) => {
    setBreads(prevBreads => prevBreads.filter(bread => bread.id !== id));
    setShowEditModal(false);
    setEditingBread(null);
  };

  return (
    <div className="baker-breads-page">
      {/* 顶部标题 */}
      <div className="baker-breads-header">
        <div className="baker-breads-title">面包管理</div>
      </div>

      {/* 面包列表 */}
      <div className="baker-breads-content">
        {breads.length === 0 ? (
          <div className="baker-breads-empty">
            <div className="baker-breads-empty-icon">🥖</div>
            <div className="baker-breads-empty-text">还没有添加面包</div>
            <div className="baker-breads-empty-hint">点击右下角按钮添加</div>
          </div>
        ) : (
          <div className="baker-breads-list">
            {breads.map(bread => (
              <div
                key={bread.id}
                className="bread-item"
                onClick={() => handleEditBread(bread)}
              >
                {/* 面包图片 */}
                <div className="bread-item-image-wrapper">
                  <img src={bread.image} alt={bread.name} className="bread-item-image" />
                  {!bread.isActive && <div className="bread-item-inactive-mask">已下架</div>}
                </div>

                {/* 面包信息 */}
                <div className="bread-item-info">
                  <div className="bread-item-header">
                    <div className="bread-item-name">{bread.name}</div>
                    <div className="bread-item-price">¥{bread.price.toFixed(2)}</div>
                  </div>

                  {/* 库存状态 */}
                  <div className="bread-item-stock">
                    <span className={`bread-item-stock-text ${bread.currentStock === 0 ? 'sold-out' : ''}`}>
                      {bread.currentStock === 0 ? '已售罄' : `库存 ${bread.currentStock}/${bread.dailyLimit}`}
                    </span>
                  </div>
                </div>

                {/* 上架/下架开关 */}
                <div className="bread-item-toggle" onClick={(e) => e.stopPropagation()}>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={bread.isActive}
                      onChange={() => handleToggleActive(bread.id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <span className="toggle-label">{bread.isActive ? '上架' : '下架'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 添加面包按钮 */}
      <button className="baker-breads-add-btn" onClick={handleAddBread}>
        <Plus size={24} />
      </button>

      {/* 底部导航 */}
      <BakerBottomNav active="breads" onChange={onNavChange} />

      {/* 编辑弹窗 */}
      {showEditModal && (
        <BreadEditModal
          bread={editingBread}
          onClose={() => {
            setShowEditModal(false);
            setEditingBread(null);
          }}
          onSave={handleSaveBread}
          onDelete={editingBread ? handleDeleteBread : undefined}
        />
      )}
    </div>
  );
}
