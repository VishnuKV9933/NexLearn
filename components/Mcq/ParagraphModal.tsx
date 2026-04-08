interface ParagraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function ParagraphModal({
  isOpen,
  onClose,
  title,
  content,
}: ParagraphModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-700">
            {title || "Comprehensive Paragraph"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="text-gray-600 leading-[1.8] text-base space-y-6 whitespace-pre-line">
            {content || "No paragraph available for this question."}
          </div>
        </div>

        <div className="p-6 border-t border-gray-50 flex justify-center md:justify-end">
          <button
            onClick={onClose}
            className="bg-[#1C3141] text-white px-20 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-black transition-all active:scale-95"
          >
            Minimize
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
