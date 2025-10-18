import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OptionGroup = ({ number, title, subtitle, image, expanded, onToggle, children }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded" />
            )}
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-900">
              {number}. {title}
            </div>
            <div className="text-xs text-gray-500">{subtitle}</div>
          </div>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export default OptionGroup;