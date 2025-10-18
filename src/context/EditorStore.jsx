import { create } from "zustand";

export const useEditorStore = create((set, get) => ({
  uiConfig: {
    // Typography
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
    
    // Colors
    cardBg: "#ffffff",
    sectionBg: "#f8f9fa",
    accentColor: "#c75b4a",
    textColor: "#111827",
    
    // Layout
    borderRadius: 12,
    containerPadding: 24,
    cardCornerRadius: 12,
    
    // Buttons
    buttonBorderRadius: 8,
    buttonShadow: "medium",
    buttonAlignment: "right",
    buttonBgColor: "#c75b4a",
    buttonTextColor: "#ffffff",
    
    // Images/Gallery
    galleryAlignment: "center",
    imageSpacing: 8,
    imageBorderRadius: 8,
    
    // Stroke/Border
    strokeColor: "#e5e7eb",
    strokeWeight: 1,
    
    // Layout
    layout: "desktop",
    activeLayout: "layout1"
  },

  product: {
    name: "Cozy Lounge Chair",
    price: 1299,
    oldPrice: 1599,
    material: "Leather",
    armFinish: "#8b5e3c",
    armsType: "Fixed Arms",
    legsFinish: "Steel",
    color: "#8b5e3c",
  },

  // Zoom state - FIXED: using proper state management
  zoom: 1,

  // Customization panel visibility
  showCustomization: true,

  updateUIConfig: (key, value) =>
    set((state) => {
      console.log(`UI Config updated: ${key} = ${value}`);
      return {
        uiConfig: { ...state.uiConfig, [key]: value }
      };
    }),

  updateProduct: (key, value) =>
    set((state) => {
      console.log(`Product updated: ${key} = ${value}`);
      return {
        product: { ...state.product, [key]: value }
      };
    }),

  // Zoom functions - FIXED: properly working zoom
  handleZoomIn: () =>
    set((state) => {
      const newZoom = Math.min(state.zoom + 0.2, 2);
      console.log(`Zoom In: ${state.zoom} -> ${newZoom}`);
      return {
        zoom: newZoom
      };
    }),

  handleZoomOut: () =>
    set((state) => {
      const newZoom = Math.max(state.zoom - 0.2, 0.6);
      console.log(`Zoom Out: ${state.zoom} -> ${newZoom}`);
      return {
        zoom: newZoom
      };
    }),

  // Reset all changes - FIXED: resets to default brown color
  handleReset: () => {
    console.log('Reset all changes');
    set({
      zoom: 1,
      product: {
        name: "Cozy Lounge Chair",
        price: 1299,
        oldPrice: 1599,
        material: "Leather",
        armFinish: "#8b5e3c",
        armsType: "Fixed Arms",
        legsFinish: "Steel",
        color: "#8b5e3c", // Reset to default brown
      }
    });
  },

  // Toggle customization panel - FIXED: proper toggle
  toggleCustomization: () =>
    set((state) => {
      const newValue = !state.showCustomization;
      console.log(`Customization panel toggled: ${newValue}`);
      return {
        showCustomization: newValue
      };
    }),

  // Import configuration
  importConfig: (config) =>
    set((state) => {
      console.log('Configuration imported');
      return {
        uiConfig: { ...state.uiConfig, ...(config.uiConfig || {}) },
        product: { ...state.product, ...(config.product || {}) },
      };
    }),

  // Export configuration
  exportConfig: () => {
    const state = get();
    console.log('Configuration exported');
    return {
      uiConfig: state.uiConfig,
      product: state.product,
      exportedAt: new Date().toISOString(),
      version: "1.0"
    };
  },

  // Reset everything to default
  reset: () => {
    console.log('Full reset to defaults');
    set({
      zoom: 1,
      showCustomization: true,
      uiConfig: {
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: 500,
        cardBg: "#ffffff",
        sectionBg: "#f8f9fa",
        accentColor: "#c75b4a",
        textColor: "#111827",
        borderRadius: 12,
        containerPadding: 24,
        cardCornerRadius: 12,
        buttonBorderRadius: 8,
        buttonShadow: "medium",
        buttonAlignment: "right",
        buttonBgColor: "#c75b4a",
        buttonTextColor: "#ffffff",
        galleryAlignment: "center",
        imageSpacing: 8,
        imageBorderRadius: 8,
        strokeColor: "#e5e7eb",
        strokeWeight: 1,
        layout: "desktop",
        activeLayout: "layout1"
      },
      product: {
        name: "Cozy Lounge Chair",
        price: 1299,
        oldPrice: 1599,
        material: "Leather",
        armFinish: "#8b5e3c",
        armsType: "Fixed Arms",
        legsFinish: "Steel",
        color: "#8b5e3c",
      }
    });
  },
}));