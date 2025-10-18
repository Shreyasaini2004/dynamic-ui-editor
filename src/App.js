import React, { useState } from "react";
import { Settings, Monitor, Smartphone } from 'lucide-react';
import { useEditorStore } from "./context/EditorStore";
import EditorPage from "./pages/EditorPage";
import DemoPage from "./pages/DemoPage";
import EditorPanel from "./components/EditorPanel";

function App() {
  const { uiConfig, updateUIConfig } = useEditorStore();
  const [showEditor, setShowEditor] = useState(true);
  const [activeView, setActiveView] = useState('product'); // 'product' or 'demo'

  return (
    <div className="min-h-screen" style={{ backgroundColor: uiConfig.sectionBg }}>
      {/* Top Navigation Bar */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm" 
        style={{ borderColor: uiConfig.strokeColor }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('product')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'product' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ fontFamily: uiConfig.fontFamily }}
            >
              Product View
            </button>
            <button
              onClick={() => setActiveView('demo')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'demo' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ fontFamily: uiConfig.fontFamily }}
            >
              Demo View
            </button>
          </div>

          {/* Center: Title */}
          <div 
            className="text-lg font-bold" 
            style={{ fontFamily: uiConfig.fontFamily, color: uiConfig.textColor }}
          >
            Dynamic UI Editor
          </div>

          {/* Right: Settings Toggle */}
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={showEditor ? "Hide UI Editor" : "Show UI Editor"}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Desktop/Mobile Toggle */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-white rounded-full shadow-lg p-1 flex gap-1">
        <button
          onClick={() => updateUIConfig('layout', 'desktop')}
          className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
            uiConfig.layout === 'desktop' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Monitor size={16} />
          Desktop
        </button>
        <button
          onClick={() => updateUIConfig('layout', 'mobile')}
          className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
            uiConfig.layout === 'mobile' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Smartphone size={16} />
          Mobile
        </button>
      </div>

      {/* Main Content */}
      <div className="flex pt-32">
        <div className={`transition-all duration-300 ${showEditor ? 'mr-96' : 'mr-0'} flex-1`}>
          {activeView === 'product' ? <EditorPage /> : <DemoPage />}
        </div>

        {/* Sliding Editor Panel */}
        {showEditor && (
          <div 
            className="w-96 h-screen fixed right-0 top-0 bg-white shadow-2xl z-40 overflow-y-auto"
            style={{ 
              borderLeft: `${uiConfig.strokeWeight}px solid ${uiConfig.strokeColor}`,
              paddingTop: '100px'
            }}
          >
            <EditorPanel />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;