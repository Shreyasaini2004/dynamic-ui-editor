import React, { useState } from "react";
import { useEditorStore } from "../context/EditorStore";

export default function DemoPage() {
  const { uiConfig, product } = useEditorStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Product images with corresponding materials
  const productImages = [
    {
      id: 0,
      src: "/images/products/chair/front.jpg",
      label: "Front",
      material: "Leather"
    },
    {
      id: 1,
      src: "/images/products/chair/45degrees.jpg",
      label: "45°",
      material: "Leather"
    },
    {
      id: 2,
      src: "/images/products/chair/side.jpg",
      label: "Side",
      material: "Leather"
    },
    {
      id: 3,
      src: "/images/products/chair/back.jpg",
      label: "Back",
      material: "Leather"
    },
    {
      id: 4,
      src: "/images/products/chair/down.jpg",
      label: "Top",
      material: "Leather"
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
    return 1.5;
  };

  const cardStyle = {
    background: uiConfig.cardBg,
    borderRadius: `${uiConfig.cardCornerRadius}px`,
    padding: `${uiConfig.containerPadding}px`,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    color: uiConfig.textColor,
    fontSize: `${uiConfig.fontSize}px`,
    fontFamily: uiConfig.fontFamily,
    fontWeight: uiConfig.fontWeight,
    border: `${uiConfig.strokeWeight}px solid ${uiConfig.strokeColor}`
  };

  const buttonStyle = {
    backgroundColor: uiConfig.buttonBgColor,
    color: uiConfig.buttonTextColor,
    borderRadius: `${uiConfig.buttonBorderRadius}px`,
    padding: "12px 24px",
    fontFamily: uiConfig.fontFamily,
    fontWeight: uiConfig.fontWeight,
    fontSize: `${uiConfig.fontSize}px`,
    border: "none",
    cursor: "pointer",
    boxShadow: uiConfig.buttonShadow === 'small' ? '0 1px 2px rgba(0,0,0,0.05)' :
                uiConfig.buttonShadow === 'medium' ? '0 4px 6px rgba(0,0,0,0.1)' :
                uiConfig.buttonShadow === 'large' ? '0 10px 15px rgba(0,0,0,0.15)' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <div 
      className="min-h-screen p-8 flex items-center justify-center"
      style={{ backgroundColor: uiConfig.sectionBg }}
    >
      <div style={cardStyle} className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-6">
          <h3 
            className="font-bold mb-2"
            style={{ 
              fontSize: `${uiConfig.fontSize * 1.8}px`,
              fontWeight: uiConfig.fontWeight + 200,
              color: uiConfig.textColor
            }}
          >
            {product.name}
          </h3>
          <p style={{ opacity: 0.7, fontSize: `${uiConfig.fontSize}px` }}>
            Customize your premium lounge chair with various materials and finishes.
          </p>
        </div>

        {/* Main Product Image */}
        <div 
          className="mb-6 relative overflow-hidden flex items-center justify-center bg-gray-200"
          style={{
            height: '500px',
            borderRadius: `${uiConfig.imageBorderRadius}px`,
            backgroundColor: uiConfig.sectionBg
          }}
        >
          <img
            src={productImages[currentImageIndex].src}
            alt={productImages[currentImageIndex].label}
            className="max-w-full max-h-full object-contain p-4 transition-all duration-300"
            style={{
              filter: `hue-rotate(${getColorAdjustment(product.color)}deg) saturate(${getSaturation(product.color)}) brightness(${getBrightness(product.color)})`
            }}
          />
          
          {/* Image Counter */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white px-4 py-2 text-sm font-semibold"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: `${uiConfig.buttonBorderRadius}px`,
              fontFamily: uiConfig.fontFamily
            }}
          >
            {currentImageIndex + 1} / {productImages.length}
          </div>

          {/* View Label */}
          <div 
            className="absolute top-4 right-4 text-white px-3 py-2 text-xs font-semibold"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: `${uiConfig.buttonBorderRadius}px`,
              fontFamily: uiConfig.fontFamily
            }}
          >
            {productImages[currentImageIndex].label}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div 
          className="flex mb-6 overflow-x-auto pb-2"
          style={{ 
            gap: `${uiConfig.imageSpacing}px`,
            justifyContent: uiConfig.galleryAlignment === 'left' ? 'flex-start' :
                           uiConfig.galleryAlignment === 'center' ? 'center' :
                           'flex-end'
          }}
        >
          {productImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 overflow-hidden transition-all hover:opacity-100 ${
                currentImageIndex === index ? 'scale-105' : 'opacity-60'
              }`}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: `${uiConfig.imageBorderRadius}px`,
                cursor: 'pointer'
              }}
              title={`${img.label}`}
            >
              <img
                src={img.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Product Info */}
        <div className="mb-6 border-t border-b py-4" style={{ borderColor: uiConfig.strokeColor }}>
          <div className="grid grid-cols-2 gap-6">
            {/* Material */}
            <div>
              <div style={{ opacity: 0.7, fontSize: `${uiConfig.fontSize - 2}px` }} className="mb-1">
                Material
              </div>
              <div 
                className="font-semibold"
                style={{ 
                  fontSize: `${uiConfig.fontSize + 2}px`,
                  color: uiConfig.textColor
                }}
              >
                {productImages[currentImageIndex].material}
              </div>
            </div>

            {/* View */}
            <div>
              <div style={{ opacity: 0.7, fontSize: `${uiConfig.fontSize - 2}px` }} className="mb-1">
                View
              </div>
              <div 
                className="font-semibold"
                style={{ 
                  fontSize: `${uiConfig.fontSize + 2}px`,
                  color: uiConfig.textColor
                }}
              >
                {productImages[currentImageIndex].label}
              </div>
            </div>

            {/* Color */}
            <div>
              <div style={{ opacity: 0.7, fontSize: `${uiConfig.fontSize - 2}px` }} className="mb-1">
                Color
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded"
                  style={{
                    backgroundColor: product.color,
                    borderRadius: `${uiConfig.buttonBorderRadius}px`,
                    border: `1px solid ${uiConfig.strokeColor}`
                  }}
                />
                <div 
                  style={{ 
                    fontSize: `${uiConfig.fontSize}px`,
                    color: uiConfig.textColor
                  }}
                >
                  {product.color}
                </div>
              </div>
            </div>

            {/* Price */}
            <div>
              <div style={{ opacity: 0.7, fontSize: `${uiConfig.fontSize - 2}px` }} className="mb-1">
                Price
              </div>
              <div 
                className="font-bold"
                style={{ 
                  fontSize: `${uiConfig.fontSize + 4}px`,
                  color: uiConfig.buttonBgColor
                }}
              >
                ${product.price}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div 
          className="flex gap-4 flex-wrap"
          style={{
            justifyContent: uiConfig.buttonAlignment === 'left' ? 'flex-start' :
                           uiConfig.buttonAlignment === 'center' ? 'center' :
                           'flex-end'
          }}
        >
          <button 
            style={buttonStyle}
            className="font-medium hover:opacity-90 active:scale-95"
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Add to cart
          </button>
          
          <button
            className="font-medium transition-all hover:opacity-90 active:scale-95"
            style={{
              borderRadius: `${uiConfig.buttonBorderRadius}px`,
              padding: "12px 24px",
              borderColor: uiConfig.buttonBgColor,
              borderWidth: `2px`,
              fontFamily: uiConfig.fontFamily,
              color: uiConfig.buttonBgColor,
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: `${uiConfig.fontSize}px`,
              fontWeight: uiConfig.fontWeight
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = `${uiConfig.buttonBgColor}20`}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            View in AR
          </button>
        </div>
      </div>
    </div>
  );
}