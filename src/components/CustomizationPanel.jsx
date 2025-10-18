import React, { useState } from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import { useEditorStore } from '../context/EditorStore';

const MaterialTab = ({ active, label, onClick }) => {
  const { uiConfig } = useEditorStore();

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
        active ? 'border-b-2' : ''
      }`}
      style={{
        fontFamily: uiConfig.fontFamily,
        fontSize: `${uiConfig.fontSize - 2}px`,
        fontWeight: active ? uiConfig.fontWeight : 400,
        color: uiConfig.textColor,
        opacity: active ? 1 : 0.6,
        borderBottomColor: active ? uiConfig.buttonBgColor : 'transparent'
      }}
    >
      {label}
    </button>
  );
};

const OptionGroup = ({ number, title, subtitle, expanded, onToggle, children }) => {
  const { uiConfig } = useEditorStore();

  return (
    <div style={{ borderBottom: `${uiConfig.strokeWeight}px solid ${uiConfig.strokeColor}` }}>
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-opacity-50 transition-colors"
        style={{ fontSize: `${uiConfig.fontSize}px`, fontFamily: uiConfig.fontFamily }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded-lg" 
            style={{ backgroundColor: uiConfig.sectionBg, color: uiConfig.textColor }}
          >
            <span className="text-sm font-semibold">{number}</span>
          </div>
          <div className="text-left">
            <div className="font-medium" style={{ color: uiConfig.textColor }}>
              {title}
            </div>
            <div className="text-xs" style={{ color: uiConfig.textColor, opacity: 0.6 }}>
              {subtitle}
            </div>
          </div>
        </div>
        <ChevronDown 
          size={20} 
          style={{ 
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s',
            color: uiConfig.textColor
          }} 
        />
      </button>
      {expanded && (
        <div style={{ padding: '0 16px 16px 16px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function CustomizationPanel() {
  const { uiConfig, product, updateProduct, handleReset } = useEditorStore();
  const [expandedOption, setExpandedOption] = useState(2);
  const [activeMaterial, setActiveMaterial] = useState('Leather');

  const materials = ['Leather', 'Silicon', 'Aluminium', 'Steel', 'Polyester', 'Plastic'];
  
  const colors = [
    { color: '#8b5e3c', label: 'Brown' },
    { color: '#4a6741', label: 'Green' },
    { color: '#5c7a6f', label: 'Sage' },
    { color: '#6b8270', label: 'Moss' },
    { color: '#5d5d7a', label: 'Slate' },
    { color: '#8b5e83', label: 'Mauve' },
    { color: '#4a5f7a', label: 'Navy' },
    { color: '#c75245', label: 'Terra' },
    { color: '#8b3a3a', label: 'Burgundy' },
    { color: '#4a7a6b', label: 'Teal' },
  ];

  const panelStyle = {
    backgroundColor: uiConfig.cardBg,
    fontFamily: uiConfig.fontFamily,
    fontSize: `${uiConfig.fontSize}px`,
    color: uiConfig.textColor,
    borderColor: uiConfig.strokeColor,
    borderWidth: `${uiConfig.strokeWeight}px`
  };

  const buttonStyle = {
    backgroundColor: uiConfig.buttonBgColor,
    color: uiConfig.buttonTextColor,
    borderRadius: `${uiConfig.buttonBorderRadius}px`,
    boxShadow: uiConfig.buttonShadow === 'small' ? '0 1px 2px rgba(0,0,0,0.05)' :
                uiConfig.buttonShadow === 'medium' ? '0 4px 6px rgba(0,0,0,0.1)' :
                uiConfig.buttonShadow === 'large' ? '0 10px 15px rgba(0,0,0,0.15)' : 'none'
  };

  const handleColorSelect = (color) => {
    updateProduct('color', color);
    updateProduct('material', activeMaterial);
    const colorName = colors.find(c => c.color === color)?.label || 'Custom';
    console.log(`Color changed to: ${colorName} (${color})`);
  };

  return (
    <div className="bg-white h-full flex flex-col overflow-hidden" style={panelStyle}>
      {/* Header */}
      <div style={{ padding: `${uiConfig.containerPadding}px`, borderBottom: `${uiConfig.strokeWeight}px solid ${uiConfig.strokeColor}` }}>
        <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: uiConfig.textColor, fontFamily: uiConfig.fontFamily }}>
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="text-sm" style={{ color: uiConfig.textColor, opacity: 0.6 }}>
            Customize your Chair
          </div>
          <button className="ml-auto">
            <Settings size={18} style={{ color: uiConfig.textColor, opacity: 0.5 }} />
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 overflow-y-auto">
        <OptionGroup
          number={1}
          title="Arms"
          subtitle={product.armsType}
          expanded={expandedOption === 1}
          onToggle={() => setExpandedOption(expandedOption === 1 ? null : 1)}
        >
          <div className="text-sm" style={{ color: uiConfig.textColor, opacity: 0.7 }}>
            Arms configuration options available.
          </div>
        </OptionGroup>

        <OptionGroup
          number={2}
          title="Arms Finish"
          subtitle={activeMaterial}
          expanded={expandedOption === 2}
          onToggle={() => setExpandedOption(expandedOption === 2 ? null : 2)}
        >
          <div className="flex gap-1 border-b mb-3 overflow-x-auto pb-2" style={{ borderColor: uiConfig.strokeColor }}>
            {materials.map(m => (
              <MaterialTab 
                key={m} 
                label={m} 
                active={activeMaterial === m} 
                onClick={() => setActiveMaterial(m)} 
              />
            ))}
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-4">
            {colors.map(({ color, label }) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                title={label}
                className={`w-12 h-12 rounded-lg transition-all ${product.color === color ? 'ring-2 scale-110' : 'opacity-80 hover:opacity-100'}`}
                style={{
                  backgroundColor: color,
                  borderRadius: `${uiConfig.imageBorderRadius}px`,
                  boxShadow: product.color === color ? `0 0 0 2px ${uiConfig.buttonBgColor}` : 'none'
                }}
              />
            ))}
          </div>
          
          {product.color && (
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: uiConfig.sectionBg }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md border-2 border-white" 
                  style={{ 
                    backgroundColor: product.color, 
                    borderRadius: `${uiConfig.imageBorderRadius}px` 
                  }} 
                />
                <div>
                  <div 
                    className="font-medium" 
                    style={{ color: uiConfig.textColor, fontFamily: uiConfig.fontFamily, fontSize: `${uiConfig.fontSize}px` }}
                  >
                    {colors.find(c => c.color === product.color)?.label || 'Custom'}
                  </div>
                  <div className="text-xs" style={{ color: uiConfig.textColor, opacity: 0.6 }}>
                    Selected finish
                  </div>
                </div>
              </div>
            </div>
          )}
        </OptionGroup>

        <OptionGroup
          number={3}
          title="Legs Finish"
          subtitle={product.legsFinish}
          expanded={expandedOption === 3}
          onToggle={() => setExpandedOption(expandedOption === 3 ? null : 3)}
        >
          <div className="text-sm" style={{ color: uiConfig.textColor, opacity: 0.7 }}>
            Legs finish options available.
          </div>
        </OptionGroup>
      </div>

      {/* Footer */}
      <div style={{ padding: `${uiConfig.containerPadding}px`, borderTop: `${uiConfig.strokeWeight}px solid ${uiConfig.strokeColor}` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm" style={{ color: uiConfig.textColor, opacity: 0.6 }}>
              Product Price
            </div>
            <div className="text-xl sm:text-2xl font-bold" style={{ color: uiConfig.textColor }}>
              ${product.price}
            </div>
          </div>
          {product.oldPrice && (
            <div className="text-sm line-through" style={{ color: uiConfig.textColor, opacity: 0.4 }}>
              ${product.oldPrice}
            </div>
          )}
        </div>
        <button 
          className="w-full py-3 font-medium transition-colors hover:opacity-90 mb-2" 
          style={buttonStyle}
        >
          Add to cart
        </button>
        <button 
          onClick={handleReset}
          className="w-full py-2 font-medium transition-colors border"
          style={{
            backgroundColor: 'transparent',
            color: uiConfig.buttonBgColor,
            borderColor: uiConfig.buttonBgColor,
            borderRadius: `${uiConfig.buttonBorderRadius}px`,
            borderWidth: '1px'
          }}
        >
          Reset All
        </button>
      </div>
    </div>
  );
}