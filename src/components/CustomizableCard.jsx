import React, { useState } from "react";
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEditorStore } from "../context/EditorStore";

export default function CustomizableCard() {
  const { uiConfig, product } = useEditorStore();
  const [isArOpen, setIsArOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Product images
  const productImages = [
    "/images/products/chair/front.jpg",
    "/images/products/chair/45degrees.jpg",
    "/images/products/chair/side.jpg",
    "/images/products/chair/back.jpg",
    "/images/products/chair/down.jpg",
  ];

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
    boxShadow: uiConfig.buttonShadow === 'small' ? '0 1px 2px rgba(0,0,0,0.05)' :
                uiConfig.buttonShadow === 'medium' ? '0 4px 6px rgba(0,0,0,0.1)' :
                uiConfig.buttonShadow === 'large' ? '0 10px 15px rgba(0,0,0,0.15)' : 'none'
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div style={cardStyle} className="max-w-2xl mx-auto">
      <div className="mb-4">
        <h3 
          className="font-bold mb-2"
          style={{ 
            fontSize: `${uiConfig.fontSize * 1.5}px`,
            fontWeight: uiConfig.fontWeight + 200 
          }}
        >
          {product.name}
        </h3>
        <p style={{ opacity: 0.7 }}>
          Customize your premium lounge chair with various materials and finishes.
        </p>
      </div>

      {/* Main Product Image with Navigation */}
      <div 
        className="mb-4 bg-gradient-to-br from-gray-50 to-gray-100 relative group overflow-hidden"
        style={{
          height: '400px',
          borderRadius: `${uiConfig.imageBorderRadius}px`,
          marginBottom: `${uiConfig.imageSpacing * 2}px`
        }}
      >
        <img
          src={productImages[currentImageIndex]}
          alt={`Product view ${currentImageIndex + 1}`}
          className="w-full h-full object-contain p-4"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback */}
        <div 
          className="w-full h-full items-center justify-center flex-col"
          style={{ display: 'none' }}
        >
          <div className="text-6xl mb-2">🪑</div>
          <div style={{ fontFamily: uiConfig.fontFamily }}>Image loading...</div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ 
            borderRadius: `${uiConfig.buttonBorderRadius}px`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <ChevronLeft size={24} color={uiConfig.textColor} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ 
            borderRadius: `${uiConfig.buttonBorderRadius}px`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <ChevronRight size={24} color={uiConfig.textColor} />
        </button>

        {/* Image Counter */}
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 text-sm"
          style={{ 
            borderRadius: `${uiConfig.buttonBorderRadius}px`,
            fontFamily: uiConfig.fontFamily
          }}
        >
          {currentImageIndex + 1} / {productImages.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div 
        className="flex mb-6 overflow-x-auto"
        style={{ 
          gap: `${uiConfig.imageSpacing}px`,
          justifyContent: uiConfig.galleryAlignment === 'left' ? 'flex-start' :
                         uiConfig.galleryAlignment === 'center' ? 'center' :
                         'flex-end'
        }}
      >
        {productImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`flex-shrink-0 overflow-hidden transition-all ${
              currentImageIndex === index ? 'ring-2' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: `${uiConfig.imageBorderRadius}px`,
              ringColor: currentImageIndex === index ? uiConfig.buttonBgColor : 'transparent'
            }}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div style={{ opacity: 0.7, fontSize: `${uiConfig.fontSize - 2}px` }}>
            Material
          </div>
          <div 
            className="font-semibold"
            style={{ fontSize: `${uiConfig.fontSize + 2}px` }}
          >
            {product.material}
          </div>
        </div>

        <div>
          <div style={{ opacity: 0.7, fontSize: `${uiConfig.fontSize - 2}px` }}>
            Price
          </div>
          <div 
            className="font-bold"
            style={{ fontSize: `${uiConfig.fontSize + 4}px` }}
          >
            ${product.price}
          </div>
        </div>
      </div>

      <div 
        className="flex"
        style={{
          justifyContent: uiConfig.buttonAlignment === 'left' ? 'flex-start' :
                         uiConfig.buttonAlignment === 'center' ? 'center' :
                         'flex-end',
          gap: `${uiConfig.imageSpacing}px`
        }}
      >
        <button 
          style={buttonStyle}
          className="font-medium transition-all hover:opacity-90"
        >
          Add to cart
        </button>
        
        <button
          onClick={() => setIsArOpen(true)}
          className="border transition-all hover:bg-gray-50"
          style={{
            borderRadius: `${uiConfig.buttonBorderRadius}px`,
            padding: "12px 20px",
            borderColor: uiConfig.strokeColor,
            borderWidth: `${uiConfig.strokeWeight}px`,
            fontFamily: uiConfig.fontFamily
          }}
        >
          View in AR
        </button>
      </div>

      {/* AR Modal */}
      {isArOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setIsArOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 max-w-2xl w-full"
            style={{ borderRadius: `${uiConfig.cardCornerRadius}px` }}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 
                className="font-bold"
                style={{ 
                  fontSize: `${uiConfig.fontSize * 1.3}px`,
                  fontFamily: uiConfig.fontFamily 
                }}
              >
                View in your room
              </h4>
              <button 
                onClick={() => setIsArOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <div 
              className="bg-gray-100 flex items-center justify-center"
              style={{ 
                height: '400px',
                borderRadius: `${uiConfig.imageBorderRadius}px` 
              }}
            >
              <div className="text-center text-gray-500">
                <Maximize2 size={48} className="mx-auto mb-2" />
                <p style={{ fontFamily: uiConfig.fontFamily }}>
                  AR viewer would open here
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}