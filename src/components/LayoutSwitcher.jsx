import React from "react";
import { Monitor, Smartphone } from 'lucide-react';
import { useEditorStore } from "../context/EditorStore";

export default function LayoutSwitcher() {
  const { uiConfig, updateUIConfig } = useEditorStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full shadow-lg p-1 flex gap-1">
      <button
        onClick={() => updateUIConfig("layout", "desktop")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
          uiConfig.layout === "desktop" 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Monitor size={16} />
        Desktop
      </button>
      <button
        onClick={() => updateUIConfig("layout", "mobile")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
          uiConfig.layout === "mobile" 
            ? 'bg-gray-900 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Smartphone size={16} />
        Mobile
      </button>
    </div>
  );
}
