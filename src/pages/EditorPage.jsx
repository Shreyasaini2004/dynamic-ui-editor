import React from 'react';
import { useEditorStore } from '../context/EditorStore';
import ProductViewer from '../components/ProductViewer';
import CustomizationPanel from '../components/CustomizationPanel';

const EditorPage = () => {
  const { uiConfig, showCustomization } = useEditorStore();

  return (
    <div className="min-h-screen" style={{ backgroundColor: uiConfig.sectionBg }}>
      {uiConfig.layout === 'mobile' ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
};

// Desktop Layout
const DesktopLayout = () => {
  const { uiConfig, showCustomization } = useEditorStore();

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <ProductViewer />
      </div>
      {showCustomization && (
        <div 
          className="w-80 sm:w-96 overflow-hidden flex flex-col"
          style={{ 
            borderLeft: `${uiConfig.strokeWeight}px solid ${uiConfig.strokeColor}`,
            backgroundColor: uiConfig.cardBg
          }}
        >
          <CustomizationPanel />
        </div>
      )}
    </div>
  );
};

// Mobile Layout
const MobileLayout = () => {
  const { showCustomization } = useEditorStore();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <div className="h-80 sm:h-96 flex-shrink-0">
        <ProductViewer />
      </div>
      {showCustomization && (
        <div className="flex-1 overflow-y-auto">
          <CustomizationPanel />
        </div>
      )}
    </div>
  );
};

export default EditorPage;