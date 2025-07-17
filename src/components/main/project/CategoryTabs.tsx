"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  categories: string[];
}

const CategoryTabs: React.FC<Props> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex gap-3 mb-6 text-center m-auto">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => router.push(`/${item}`)}
          className={`px-4 py-2 rounded-full border text-sm font-medium ${
            pathname === `/${item}`
              ? "bg-green-400 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
