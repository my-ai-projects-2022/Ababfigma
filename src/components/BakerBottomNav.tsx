import React from 'react';
import { ClipboardList, Croissant, User } from 'lucide-react';

export type BakerNavItem = 'orders' | 'breads' | 'profile';

interface BakerBottomNavProps {
  active: BakerNavItem;
  onChange: (item: BakerNavItem) => void;
}

export default function BakerBottomNav({ active, onChange }: BakerBottomNavProps) {
  return (
    <div className="baker-bottom-nav">
      <button
        className={`baker-nav-item ${active === 'orders' ? 'active' : ''}`}
        onClick={() => onChange('orders')}
      >
        <ClipboardList size={24} />
        <span className="baker-nav-label">订单</span>
      </button>
      <button
        className={`baker-nav-item ${active === 'breads' ? 'active' : ''}`}
        onClick={() => onChange('breads')}
      >
        <Croissant size={24} />
        <span className="baker-nav-label">面包</span>
      </button>
      <button
        className={`baker-nav-item ${active === 'profile' ? 'active' : ''}`}
        onClick={() => onChange('profile')}
      >
        <User size={24} />
        <span className="baker-nav-label">我的</span>
      </button>
    </div>
  );
}
