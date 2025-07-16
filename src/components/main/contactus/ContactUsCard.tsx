import React from "react";
import { ContactUsType } from "@/types";
import { formatDateTime } from "@/utils/formatDate";
import { sanitizeHtmlClient } from "@/utils/sanitizeHtmlClient";

interface Props {
  item: ContactUsType;
}

const ContactUsCard: React.FC<Props> = ({ item }) => {
  const { id, title, content, createdAt, updatedAt } = item;

  return (
    <div className="relative h-[150px] bg-white border rounded-xl shadow hover:shadow-lg transition p-6 cursor-pointer">
      <h2 className="text-lg font-bold text-gray-900 mb-2 truncate">
        {title}
      </h2>

      <p
        className="text-sm text-gray-700 line-clamp-2 pr-6"
        dangerouslySetInnerHTML={{ __html: sanitizeHtmlClient(content) }}
      />

      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
        {formatDateTime(createdAt)}
      </div>
    </div>
  );
};

export default ContactUsCard;
