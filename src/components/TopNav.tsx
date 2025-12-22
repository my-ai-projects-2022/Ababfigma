import React from 'react';
import { MapPin, Search } from 'lucide-react';

interface TopNavProps {
  city: string;
  onSearch: (query: string) => void;
}

export default function TopNav({ city, onSearch }: TopNavProps) {
  return (
    <div className="top-nav">
      <div className="header">
        <div className="location">
          <div className="icon-wrapper">
            <MapPin size={20} strokeWidth={2} />
          </div>
          <span className="city">{city}</span>
        </div>
      </div>
      
      <div className="search-box">
        <Search className="search-icon" size={18} strokeWidth={2} />
        <input
          className="search-input"
          type="text"
          placeholder="搜索面包或主理人"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}