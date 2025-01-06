import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, altText, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-gray-900 rounded-lg p-2"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
