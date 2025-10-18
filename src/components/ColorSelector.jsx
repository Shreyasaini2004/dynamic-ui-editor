import React from 'react';

const ColorSelector = ({ colors, selectedColor, onColorSelect, showLabel = false }) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {colors.map((item) => (
        <div key={item.color} className="flex flex-col items-center gap-1">
          <button
            onClick={() => onColorSelect(item.color)}
            className={`w-12 h-12 rounded-full transition-all ${
              selectedColor === item.color 
                ? 'ring-2 ring-offset-2 ring-gray-900' 
                : 'hover:scale-110'
            }`}
            style={{ backgroundColor: item.color }}
            title={item.label}
            aria-label={`Select ${item.label} color`}
          />
          {showLabel && selectedColor === item.color && (
            <div className="text-xs text-center font-medium text-gray-900 max-w-full truncate px-1">
              {item.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;