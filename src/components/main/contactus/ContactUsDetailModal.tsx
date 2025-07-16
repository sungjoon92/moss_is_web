import React from "react";
import { ContactUsType } from "@/types";
import { formatDateTime } from "@/utils/formatDate";

interface Props {
  item: ContactUsType;
  onClose: () => void;
}

const ContactUsDetailModal: React.FC<Props> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
        <div
          className="text-gray-800 text-sm prose"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
        <p className="mt-6 text-xs text-gray-400 text-right">
          작성일: {formatDateTime(item.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ContactUsDetailModal;
