import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      />
      <div
        className={cn(
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl relative",
          "animate-in fade-in-0 slide-in-from-bottom-4 duration-200",
          className
        )}
      >
        <button
          onClick={onClose}
          className={cn(
            "absolute right-4 top-4 p-2 rounded-full",
            "hover:bg-gray-100 focus:bg-gray-100",
            "focus:outline-none focus:ring-2 focus:ring-gray-200",
            "transition-colors duration-200"
          )}
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export const ModalHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("px-6 py-4 border-b", className)}>{children}</div>;

export const ModalBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("px-6 py-4", className)}>{children}</div>;
