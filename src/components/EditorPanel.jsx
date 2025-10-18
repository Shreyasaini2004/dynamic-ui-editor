import React, { useRef } from "react";
import { Download, Upload, RotateCcw } from 'lucide-react';
import { useEditorStore } from "../context/EditorStore";

export default function EditorPanel() {
  const { uiConfig, updateUIConfig, importConfig, exportConfig, reset } = useEditorStore();
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const data = exportConfig();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ui-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ Configuration exported successfully!');
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        importConfig(data);
        alert('✅ Configuration imported successfully!');
      } catch {
        alert('❌ Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <h3 className="text-xl font-bold text-gray-900">UI Editor</h3>
          <button
            onClick={reset}
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
            Typography
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={uiConfig.fontFamily}
              onChange={(e) => updateUIConfig('fontFamily', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Helvetica">Helvetica</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Weight
            </label>
            <select
              value={uiConfig.fontWeight}
              onChange={(e) => updateUIConfig('fontWeight', Number(e.target.value))}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="400">Regular (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600">Semibold (600)</option>
              <option value="700">Bold (700)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size: {uiConfig.fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="60"
              value={uiConfig.fontSize}
              onChange={(e) => updateUIConfig('fontSize', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10px</span>
              <span>60px</span>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
            Button
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Radius: {uiConfig.buttonBorderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={uiConfig.buttonBorderRadius}
              onChange={(e) => updateUIConfig('buttonBorderRadius', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shadow
            </label>
            <select
              value={uiConfig.buttonShadow}
              onChange={(e) => updateUIConfig('buttonShadow', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="none">None</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['left', 'center', 'right'].map(align => (
                <button
                  key={align}
                  onClick={() => updateUIConfig('buttonAlignment', align)}
                  className={`py-2 rounded-lg border font-medium capitalize transition-colors ${
                    uiConfig.buttonAlignment === align
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={uiConfig.buttonBgColor}
                onChange={(e) => updateUIConfig('buttonBgColor', e.target.value)}
                className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={uiConfig.buttonBgColor}
                onChange={(e) => updateUIConfig('buttonBgColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={uiConfig.buttonTextColor}
                onChange={(e) => updateUIConfig('buttonTextColor', e.target.value)}
                className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={uiConfig.buttonTextColor}
                onChange={(e) => updateUIConfig('buttonTextColor', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        {/* Gallery/Images Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
            Gallery / Images
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Alignment
            </label>
            <select
              value={uiConfig.galleryAlignment}
              onChange={(e) => updateUIConfig('galleryAlignment', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="left">Grid Left</option>
              <option value="center">Grid Center</option>
              <option value="right">Grid Right</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Spacing: {uiConfig.imageSpacing}px
            </label>
            <input
              type="range"
              min="0"
              max="32"
              value={uiConfig.imageSpacing}
              onChange={(e) => updateUIConfig('imageSpacing', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
/>
</div>
<div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Border Radius: {uiConfig.imageBorderRadius}px
        </label>
        <input
          type="range"
          min="0"
          max="24"
          value={uiConfig.imageBorderRadius}
          onChange={(e) => updateUIConfig('imageBorderRadius', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>

    {/* General Layout Section */}
    <div className="space-y-4">
      <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
        General Layout
      </h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Corner Radius: {uiConfig.cardCornerRadius}px
        </label>
        <input
          type="range"
          min="0"
          max="32"
          value={uiConfig.cardCornerRadius}
          onChange={(e) => updateUIConfig('cardCornerRadius', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Container Padding: {uiConfig.containerPadding}px
        </label>
        <input
          type="range"
          min="8"
          max="48"
          value={uiConfig.containerPadding}
          onChange={(e) => updateUIConfig('containerPadding', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Section Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={uiConfig.sectionBg}
            onChange={(e) => updateUIConfig('sectionBg', e.target.value)}
            className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={uiConfig.sectionBg}
            onChange={(e) => updateUIConfig('sectionBg', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="#F8F9FA"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={uiConfig.cardBg}
            onChange={(e) => updateUIConfig('cardBg', e.target.value)}
            className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={uiConfig.cardBg}
            onChange={(e) => updateUIConfig('cardBg', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="#FFFFFF"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={uiConfig.textColor}
            onChange={(e) => updateUIConfig('textColor', e.target.value)}
            className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={uiConfig.textColor}
            onChange={(e) => updateUIConfig('textColor', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="#111827"
          />
        </div>
      </div>
    </div>

    {/* Stroke/Border Section */}
    <div className="space-y-4">
      <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
        Stroke / Border
      </h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stroke Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={uiConfig.strokeColor}
            onChange={(e) => updateUIConfig('strokeColor', e.target.value)}
            className="w-16 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={uiConfig.strokeColor}
            onChange={(e) => updateUIConfig('strokeColor', e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="#E5E7EB"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stroke Weight: {uiConfig.strokeWeight}px
        </label>
        <input
          type="range"
          min="0"
          max="8"
          value={uiConfig.strokeWeight}
          onChange={(e) => updateUIConfig('strokeWeight', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>

    {/* Export/Import Actions */}
    <div className="space-y-3 pt-4 border-t">
      <button
        onClick={handleExport}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
      >
        <Download size={18} />
        Export Configuration (JSON)
      </button>
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
      >
        <Upload size={18} />
        Import Configuration
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileImport}
        className="hidden"
      />
    </div>

    {/* Info Box */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
      <p className="font-semibold mb-1">💡 Live Preview Active</p>
      <p className="text-blue-700">All changes are applied in real-time to the UI component.</p>
    </div>
  </div>
</div>
);
}
