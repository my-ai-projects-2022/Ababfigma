import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface NoteModalProps {
  initialNote: string;
  bakerName: string;
  onSave: (note: string) => void;
  onClose: () => void;
}

export default function NoteModal({ initialNote, bakerName, onSave, onClose }: NoteModalProps) {
  const [note, setNote] = useState(initialNote);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // 自动聚焦到输入框
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(note.trim());
    onClose();
  };

  const remainingChars = 100 - note.length;

  return (
    <div className="note-modal-overlay" onClick={handleOverlayClick}>
      <div className="note-modal-content">
        <div className="note-modal-header">
          <h2 className="note-modal-title">备注主理人</h2>
          <button className="note-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="note-modal-body">
          <div className="note-baker-name">{bakerName}</div>
          
          <textarea
            ref={textareaRef}
            className="note-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 100))}
            placeholder="添加备注，方便下次找到主理人..."
            maxLength={100}
          />

          <div className="note-char-count">
            <span className={remainingChars < 10 ? 'warning' : ''}>
              {note.length}/100
            </span>
          </div>
        </div>

        <div className="note-modal-footer">
          <button className="note-cancel-btn" onClick={onClose}>
            取消
          </button>
          <button className="note-save-btn" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
