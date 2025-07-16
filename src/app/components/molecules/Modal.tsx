import React, { useEffect, useRef } from "react";
import Button from "../atoms/Button";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--foreground)]/50 px-2 md:px-0 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={modalRef}
        className="bg-[var(--card)] rounded-xl px-8 py-8 w-full max-w-sm shadow-none max-h-[90vh] overflow-y-auto outline-none flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {title && (
          <div className="flex justify-between items-center mb-0">
            <h2 className="text-base md:text-lg font-semibold" id={titleId}>{title}</h2>
            <Button
              onClick={onClose}
              className="p-1 w-8 h-8 flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-2xl font-bold bg-transparent shadow-none"
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
