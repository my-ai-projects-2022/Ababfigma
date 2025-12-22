import React from 'react';
import { Home, ShoppingBag, User } from 'lucide-react';

type NavItem = 'home' | 'orders' | 'profile';

interface BottomNavProps {
  active: NavItem;
  onChange: (item: NavItem) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="bottom-nav">
      <button
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={() => onChange('home')}
      >
        <div className="nav-icon">
          <Home size={24} strokeWidth={2} />
        </div>
        <span className="nav-text">首页</span>
      </button>
      
      <button
        className={`nav-item ${active === 'orders' ? 'active' : ''}`}
        onClick={() => onChange('orders')}
      >
        <div className="nav-icon">
          <ShoppingBag size={24} strokeWidth={2} />
        </div>
        <span className="nav-text">订单</span>
      </button>
      
      <button
        className={`nav-item ${active === 'profile' ? 'active' : ''}`}
        onClick={() => onChange('profile')}
      >
        <div className="nav-icon">
          <User size={24} strokeWidth={2} />
        </div>
        <span className="nav-text">我的</span>
      </button>
    </div>
  );
}