import React, { useState } from 'react';
import DetailTopNav from './DetailTopNav';
import BakerInfo from './BakerInfo';
import BreadCard from './BreadCard';
import CartBar from './CartBar';
import BreadDetailModal from './BreadDetailModal';
import CartModal from './CartModal';
import CheckoutModal from './CheckoutModal';
import ShareModal from './ShareModal';
import NoteModal from './NoteModal';

export interface Bread {
  id: string;
  name: string;
  image: string;
  price: number;
  isHot: boolean;
  isPurchased: boolean;
  category: string; // 甜面包、咸面包等
  tags: string[]; // 健康、全麦、长时间发酵、易消化等
  description: string;
  soldCount: number; // 已售数量
}

export interface BakerDetailData {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  totalSold: number; // 已卖出面包总数
  distance: number;
  location: string;
  isOpen: boolean;
  hotBreads: Array<{ name: string; count: number }>;
  breads: Bread[];
}

interface BakerDetailProps {
  baker: BakerDetailData;
  onBack: () => void;
  onShare: () => void;
}

export default function BakerDetail({ baker, onBack, onShare }: BakerDetailProps) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedBreadId, setSelectedBreadId] = useState<string | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [bakerNote, setBakerNote] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [likedBreads, setLikedBreads] = useState<Record<string, boolean>>({});

  // 切换收藏状态
  const handleToggleFavorite = () => {
    setIsFavorited(prev => !prev);
  };

  // 切换面包喜欢状态
  const handleToggleLike = (breadId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setLikedBreads(prev => ({
      ...prev,
      [breadId]: !prev[breadId],
    }));
  };

  const handleAddToCart = (breadId: string) => {
    setCart(prev => ({
      ...prev,
      [breadId]: (prev[breadId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (breadId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[breadId] > 1) {
        newCart[breadId] -= 1;
      } else {
        delete newCart[breadId];
      }
      return newCart;
    });
  };

  const handleUpdateQuantity = (breadId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[breadId];
        return newCart;
      });
    } else {
      setCart(prev => ({
        ...prev,
        [breadId]: quantity,
      }));
    }
  };

  const handleClearCart = () => {
    setCart({});
    setShowCartModal(false);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handlePaymentComplete = () => {
    setShowCheckoutModal(false);
    // TODO: 跳转到订单页面
    alert('订单已创建，跳转到订单页面');
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [breadId, count]) => {
    const bread = baker.breads.find(b => b.id === breadId);
    return sum + (bread?.price || 0) * count;
  }, 0);

  const selectedBread = selectedBreadId ? baker.breads.find(b => b.id === selectedBreadId) : null;

  // 获取购物车项目列表
  const cartItems = Object.entries(cart).map(([breadId, quantity]) => {
    const bread = baker.breads.find(b => b.id === breadId);
    return bread ? { bread, quantity } : null;
  }).filter((item): item is { bread: Bread; quantity: number } => item !== null);

  return (
    <div className="baker-detail">
      <DetailTopNav 
        onBack={onBack} 
        onShare={() => setShowShareModal(true)}
        onNote={() => setShowNoteModal(true)}
        onFavorite={handleToggleFavorite}
        isFavorited={isFavorited}
      />
      
      <div className="detail-content">
        <BakerInfo baker={baker} note={bakerNote} />
        
        <div className="bread-list">
          {baker.breads.map(bread => (
            <BreadCard
              key={bread.id}
              bread={bread}
              quantity={cart[bread.id] || 0}
              onAdd={() => handleAddToCart(bread.id)}
              onRemove={() => handleRemoveFromCart(bread.id)}
              onUpdateQuantity={(qty) => handleUpdateQuantity(bread.id, qty)}
              onCardClick={() => setSelectedBreadId(bread.id)}
              onLike={(event) => handleToggleLike(bread.id, event)}
              isLiked={likedBreads[bread.id] || false}
            />
          ))}
        </div>
      </div>
      
      <CartBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
        onCartClick={() => setShowCartModal(true)}
      />

      {/* 面包详情弹窗 */}
      {selectedBread && (
        <BreadDetailModal
          bread={selectedBread}
          quantity={cart[selectedBread.id] || 0}
          onAdd={() => handleAddToCart(selectedBread.id)}
          onRemove={() => handleRemoveFromCart(selectedBread.id)}
          onUpdateQuantity={(qty) => handleUpdateQuantity(selectedBread.id, qty)}
          onClose={() => setSelectedBreadId(null)}
          onLike={() => handleToggleLike(selectedBread.id)}
          isLiked={likedBreads[selectedBread.id] || false}
        />
      )}

      {/* 购物车弹窗 */}
      {showCartModal && (
        <CartModal
          items={cartItems}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          onClose={() => setShowCartModal(false)}
        />
      )}

      {/* 结算弹窗 */}
      {showCheckoutModal && (
        <CheckoutModal
          bakerName={baker.name}
          totalPrice={totalPrice}
          onComplete={handlePaymentComplete}
          onClose={() => setShowCheckoutModal(false)}
        />
      )}

      {/* 分享弹窗 */}
      {showShareModal && (
        <ShareModal
          bakerName={baker.name}
          breads={baker.hotBreads.map(b => b.name)}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* 备注弹窗 */}
      {showNoteModal && (
        <NoteModal
          initialNote={bakerNote}
          bakerName={baker.name}
          onSave={(note) => setBakerNote(note)}
          onClose={() => setShowNoteModal(false)}
        />
      )}
    </div>
  );
}