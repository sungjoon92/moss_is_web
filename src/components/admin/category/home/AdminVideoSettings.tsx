"use client";

import React, { useState, useEffect } from "react";

export default function AdminVideoSettings() {
  const [videoUrl, setVideoUrl] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mainVideoUrl");
    if (stored) setVideoUrl(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem("mainVideoUrl", videoUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-bold mb-4">홈 영상 관리</h2>
      <label className="block font-medium text-lg">영상 URL</label>
      <input
        type="text"
        placeholder="https://your-video-url.webm"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSave}
        className="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-2 rounded-lg"
      >
        저장
      </button>
      {saved && (
        <p className="text-green-600 font-medium mt-2">✅ 저장 완료!</p>
      )}
    </div>
  );
}
