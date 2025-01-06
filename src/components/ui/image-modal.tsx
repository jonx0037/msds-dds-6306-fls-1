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
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-gray-900 rounded-lg p-2 my-8"
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
          className="w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
