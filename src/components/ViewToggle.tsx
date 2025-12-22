import React from 'react';
import { List, Map } from 'lucide-react';

type ViewMode = 'list' | 'map';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle">
      <div className="toggle-container">
        <button
          className={`toggle-btn ${mode === 'list' ? 'active' : ''}`}
          onClick={() => onChange('list')}
        >
          <List className="btn-icon" size={18} strokeWidth={2} />
          <span className="btn-text">列表</span>
        </button>
        <button
          className={`toggle-btn ${mode === 'map' ? 'active' : ''}`}
          onClick={() => onChange('map')}
        >
          <Map className="btn-icon" size={18} strokeWidth={2} />
          <span className="btn-text">地图</span>
        </button>
      </div>
    </div>
  );
}