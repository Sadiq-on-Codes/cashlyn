import React, { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = title ? "modal-title" : undefined;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900" id={titleId}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
