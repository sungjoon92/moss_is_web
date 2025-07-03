import React from "react";

interface Props {
  onConfirm: () => void;
  countdown: number;
}

export default function AutoLogoutModal({ onConfirm, countdown }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center space-y-4">
        <h2 className="text-xl font-bold text-red-600">자동 로그아웃 안내</h2>
        <p className="text-gray-700">
          10분간 활동이 없어
          <strong className="text-red-500 text-2xl"> {countdown} </strong>초 후
          로그아웃됩니다.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700"
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
