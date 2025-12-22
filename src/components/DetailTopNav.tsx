import React from 'react';
import { ChevronLeft, Share2, FileText, Bookmark } from 'lucide-react';

interface DetailTopNavProps {
  onBack: () => void;
  onShare: () => void;
  onNote: () => void;
  onFavorite: () => void;
  isFavorited: boolean;
}

export default function DetailTopNav({ onBack, onShare, onNote, onFavorite, isFavorited }: DetailTopNavProps) {
  return (
    <div className="detail-top-nav">
      <button className="detail-nav-btn back-btn" onClick={onBack}>
        <ChevronLeft size={24} />
      </button>
      <div className="detail-nav-right">
        <button 
          className={`detail-nav-btn favorite-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={onFavorite}
        >
          <Bookmark size={20} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
        <button className="detail-nav-btn note-btn" onClick={onNote}>
          <FileText size={20} />
        </button>
        <button className="detail-nav-btn share-btn" onClick={onShare}>
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
}