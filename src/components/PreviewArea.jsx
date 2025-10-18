import React from "react";
import { useEditorStore } from "../context/EditorStore";
import CustomizableCard from "./CustomizableCard";

export default function PreviewArea() {
  const { uiConfig } = useEditorStore();

  return (
    <div 
      className="flex-1 p-8 min-h-screen"
      style={{ 
        backgroundColor: uiConfig.sectionBg,
        fontFamily: uiConfig.fontFamily 
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 
            className="font-bold mb-2"
            style={{ 
              color: uiConfig.textColor, 
              fontSize: `${uiConfig.fontSize * 2}px`,
              fontFamily: uiConfig.fontFamily,
              fontWeight: uiConfig.fontWeight + 200
            }}
          >
            Live Preview
          </h2>
          <p 
            style={{ 
              color: uiConfig.textColor,
              opacity: 0.7,
              fontFamily: uiConfig.fontFamily,
              fontSize: `${uiConfig.fontSize}px`
            }}
          >
            All changes from the editor are reflected in real-time
          </p>
        </div>

        <CustomizableCard />
      </div>
    </div>
  );
}