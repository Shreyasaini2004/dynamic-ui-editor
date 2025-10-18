import React, { useState } from 'react';
import { Settings, Maximize2, Plus, Minus, RotateCcw } from 'lucide-react';
import { useEditorStore } from '../context/EditorStore';

const ProductViewer = () => {
  const { uiConfig, product, handleZoomIn, handleZoomOut, handleReset, toggleCustomization, zoom } = useEditorStore();
  const [selectedAngle, setSelectedAngle] = useState(0);

  // Using local images from public folder
  const productAngles = [
    { 
      id: 0, 
      label: "Front", 
      src: "/images/products/chair/front.jpg"
    },
    { 
      id: 1, 
      label: "45°", 
      src: "/images/products/chair/45degrees.jpg"
    },
    { 
      id: 2, 
      label: "Side", 
      src: "/images/products/chair/side.jpg"
    },
    { 
      id: 3, 
      label: "Back", 
      src: "/images/products/chair/back.jpg"
    },
    { 
      id: 4, 
      label: "Top", 
      src: "/images/products/chair/down.jpg"
    },
  ];

  const getColorAdjustment = (color) => {
    const colorMap = {
      '#8b5e3c': 0,      // Brown - default
      '#4a6741': 95,     // Forest Green
      '#5c7a6f': 150,    // Sage
      '#6b8270': 110,    // Moss
      '#5d5d7a': 220,    // Slate
      '#8b5e83': 290,    // Mauve/Purple
      '#4a5f7a': 200,    // Navy
      '#c75245': 5,      // Terracotta
      '#8b3a3a': 350,    // Burgundy
      '#4a7a6b': 165,    // Teal
    };
    return colorMap[color] || 0;
  };

  const getBrightness = (color) => {
    const darkerColors = ['#8b5e83', '#5d5d7a', '#4a5f7a'];
    return darkerColors.includes(color) ? 0.95 : 1;
  };

  const getSaturation = (color) => {
    // Increase saturation for better color visibility
    return 1.5;
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      style={{ backgroundColor: uiConfig.sectionBg }}
    >
      {/* Main Product Image Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={productAngles[selectedAngle].src}
            alt={`Product ${productAngles[selectedAngle].label} view`}
            className="max-w-full max-h-full object-contain transition-all duration-300"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              borderRadius: `${uiConfig.imageBorderRadius}px`,
              boxShadow: uiConfig.buttonShadow === 'small' ? '0 4px 6px rgba(0,0,0,0.1)' :
                         uiConfig.buttonShadow === 'medium' ? '0 10px 25px rgba(0,0,0,0.15)' :
                         uiConfig.buttonShadow === 'large' ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
              // Apply color filter to entire image including arms
              filter: `hue-rotate(${getColorAdjustment(product.color)}deg) saturate(${getSaturation(product.color)}) brightness(${getBrightness(product.color)})`,
              transform: `scale(${zoom})`,
            }}
          />
          
          {/* Current View Label */}
          <div 
            className="absolute top-4 right-4 px-3 py-2 bg-white/95 backdrop-blur-sm shadow-md"
            style={{ 
              borderRadius: `${uiConfig.buttonBorderRadius}px`,
              fontFamily: uiConfig.fontFamily,
              color: uiConfig.textColor,
              fontSize: `${uiConfig.fontSize - 2}px`
            }}
          >
            <div className="text-xs opacity-60">Current View</div>
            <div className="font-semibold">{productAngles[selectedAngle].label}</div>
          </div>

          {/* Zoom Level Display */}
          <div 
            className="absolute bottom-4 right-4 px-3 py-2 bg-white/95 backdrop-blur-sm shadow-md"
            style={{ 
              borderRadius: `${uiConfig.buttonBorderRadius}px`,
              fontFamily: uiConfig.fontFamily,
              color: uiConfig.textColor,
              fontSize: `${uiConfig.fontSize - 2}px`
            }}
          >
            <div className="text-xs opacity-60">Zoom</div>
            <div className="font-semibold">{(zoom * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {/* Left Side Control Buttons */}
      <div className="absolute left-4 sm:left-6 bottom-32 sm:bottom-24 flex flex-col gap-2 z-10">
        {[
          { Icon: Settings, label: 'Settings', action: () => { console.log('Settings clicked'); toggleCustomization(); } },
          { Icon: RotateCcw, label: 'Reset', action: () => { console.log('Reset clicked'); handleReset(); } },
          { Icon: Maximize2, label: 'Fullscreen', action: () => console.log('Fullscreen clicked') },
          { Icon: Plus, label: 'Zoom In', action: () => { console.log('Zoom In clicked'); handleZoomIn(); } },
          { Icon: Minus, label: 'Zoom Out', action: () => { console.log('Zoom Out clicked'); handleZoomOut(); } }
        ].map(({ Icon, label, action }, i) => (
          <button 
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              action();
            }}
            title={label}
            type="button"
            className="w-10 h-10 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white hover:scale-105 transition-all active:scale-95 cursor-pointer"
            style={{ borderRadius: `${uiConfig.buttonBorderRadius}px` }}
          >
            <Icon size={18} style={{ color: uiConfig.textColor }} />
          </button>
        ))}
      </div>

      {/* View in Room Button - Top Left */}
      <div className="absolute left-4 sm:left-6 top-6 z-10">
        <button 
          className="px-4 sm:px-5 py-2 shadow-lg text-xs sm:text-sm font-medium hover:opacity-90 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          style={{ 
            backgroundColor: uiConfig.buttonBgColor,
            color: uiConfig.buttonTextColor,
            borderRadius: `${uiConfig.buttonBorderRadius}px`,
            fontFamily: uiConfig.fontFamily,
            fontSize: `${uiConfig.fontSize}px`,
            fontWeight: uiConfig.fontWeight,
            boxShadow: uiConfig.buttonShadow === 'small' ? '0 2px 4px rgba(0,0,0,0.1)' :
                       uiConfig.buttonShadow === 'medium' ? '0 6px 12px rgba(0,0,0,0.15)' :
                       uiConfig.buttonShadow === 'large' ? '0 12px 24px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Maximize2 size={16} />
          View in room
        </button>
      </div>

      {/* Thumbnail Navigation - Bottom Center */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex bg-white/95 backdrop-blur-sm shadow-lg overflow-x-auto z-10"
        style={{ 
          gap: `${uiConfig.imageSpacing}px`,
          padding: `${uiConfig.imageSpacing}px`,
          borderRadius: `${uiConfig.buttonBorderRadius}px`,
          maxWidth: '90vw'
        }}
      >
        {productAngles.map((angle) => (
          <button
            key={angle.id}
            onClick={() => setSelectedAngle(angle.id)}
            className={`overflow-hidden transition-all relative group flex-shrink-0 ${
              selectedAngle === angle.id ? 'ring-2 scale-105' : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
            style={{ 
              width: '60px',
              height: '60px',
              borderRadius: `${uiConfig.imageBorderRadius}px`,
              ringColor: selectedAngle === angle.id ? uiConfig.buttonBgColor : 'transparent',
              border: selectedAngle === angle.id ? `2px solid ${uiConfig.buttonBgColor}` : 'none'
            }}
            title={angle.label}
            type="button"
          >
            <img
              src={angle.src}
              alt={angle.label}
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ 
                fontFamily: uiConfig.fontFamily,
                fontSize: `${uiConfig.fontSize - 4}px`
              }}
            >
              <span className="text-white text-xs font-medium">{angle.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductViewer;