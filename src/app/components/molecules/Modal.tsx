import React from "react";
import Button from "../atoms/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h2
            className="text-lg font-semibold mb-4
        "
          >
            Send Money
          </h2>
          <Button
            onClick={onClose}
            className=" p-1 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-2xl font-bold bg-transparent shadow-none"
            aria-label="Close"
          >
            ×
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
