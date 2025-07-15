import React from "react";
import Button from "../atoms/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 md:px-0"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-2 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-2 md:mb-4">
            <h2 className="text-base md:text-lg font-semibold">{title}</h2>
            <Button
              onClick={onClose}
              className="p-1 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-2xl font-bold bg-transparent shadow-none"
              aria-label="Close"
            >
              ×
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
