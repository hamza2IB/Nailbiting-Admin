"use client";

// import { Trash2 } from "lucide-react";
import { useEffect } from "react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "動画の削除",
  message = "実行してよろしいですか？このアクションは取り消すことができません。",
}) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[400px] rounded-lg bg-white p-0 shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
           <img
                src="/svgs/videos/cross.svg"
                alt="Logo"
              />
        </button>

        <div className="p-6 pt-8">
          {/* Header */}
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex  items-center justify-center ">
              <img
                className="cursor-pointer  relative mt-[-30px] ml-[-40px]"
                src="/svgs/videos/background.svg"
                alt="Logo"
              />
              <img
                className="cursor-pointer absolute  left-[15px] top-[14px]"
                src="/svgs/videos/deleteIcon.svg"
                alt="Logo"
              />
              {/* <Trash2 className="h-6 w-6 text-red-600" /> */}
            </div>
          </div>
          <div className="mt-[-80px]">
            <h2 id="modal-title" className="text-xl font-medium">
              {title}
            </h2>

            {/* Content */}
            <p className=" text-sm mt-1 text-gray-500">{message}</p>

            {/* Footer */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-[8px] border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none "
              >
                キャンセル
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-[8px] bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none delete-btn"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
