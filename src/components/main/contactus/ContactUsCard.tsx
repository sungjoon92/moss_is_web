import React from "react";
import { ContactUsType } from "@/types";
import { formatDateTime } from "@/utils/formatDate";

interface Props {
  item: ContactUsType;
}

const ContactUsCard: React.FC<Props> = ({ item }) => {
  const { id, title, content, createdAt, updatedAt } = item;

  return (
    <div className="border rounded-lg p-5 shadow hover:shadow-md transition cursor-pointer bg-white">
      <h2 className="text-xl font-semibold text-gray-900 truncate"></h2>
      <div className="flex justify-between text-sm text-gray-500 mt-3">
        <span>{title}</span>
        <span>{content}</span>
        <span>{formatDateTime(createdAt)}</span>
      </div>
    </div>
  );
};

export default ContactUsCard;
