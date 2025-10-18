# Dynamic UI Editor - Product Configurator

A modern React application for interactive product customization with real-time UI editing. Features color selection, zoom controls, multiple product angles, and responsive design.

## Features

- **Product Customization**: Color picker with 10 options, material selection, and zoom controls
- **Multi-angle Viewing**: 5 product views (Front, 45°, Side, Back, Top)
- **Real-time UI Editor**: Customize typography, colors, spacing, and button styles
- **Responsive Design**: Desktop and mobile optimized layouts
- **Instant Preview**: All changes apply immediately without lag
- **Dual View Modes**: Product View for customization, Demo View for showcase

## Tech Stack

- **Frontend**: React 18+
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build**: Create React App

## Project Structure

```
src/
├── context/EditorStore.js         # State management
├── components/
│   ├── ProductViewer.jsx          # Product display & controls
│   ├── CustomizationPanel.jsx     # Color/material selector
│   ├── EditorPanel.jsx            # UI configuration
│   └── OptionGroup.jsx            # Expandable sections
├── pages/
│   ├── EditorPage.jsx             # Main layout
│   ├── DemoPage.jsx               # Product showcase
│   └── App.jsx                    # Root component
└── public/images/products/chair/  # Product images
```

## Installation

```bash
# Clone and install
git clone https://github.com/Shreyasaini2004/dynamic-ui-editor.git
cd dynamic-ui-editor
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Key Components

### EditorStore (Zustand)
Centralized state management for UI config and product data.

**Actions:**
- `updateUIConfig(key, value)` - Update UI styling
- `updateProduct(key, value)` - Update product data
- `handleZoomIn/Out()` - Control zoom level (0.6x - 2x)
- `handleReset()` - Reset to defaults
- `toggleCustomization()` - Toggle panel visibility

### ProductViewer
Interactive product display with:
- Color filtering (CSS hue-rotate)
- Thumbnail gallery (5 angles)
- Zoom percentage display
- Settings button for panel control

### CustomizationPanel
Product customization with:
- Expandable option groups
- 10 color swatches
- 6 material options
- Price display
- Reset All button

### DemoPage
Product showcase with:
- 5 viewing angles
- Material/color/price info
- Clean, minimal interface

## Color Mapping

```javascript
Brown: #8b5e3c    | Green: #4a6741   | Sage: #5c7a6f
Moss: #6b8270     | Slate: #5d5d7a   | Mauve: #8b5e83
Navy: #4a5f7a     | Terracotta: #c75245 | Burgundy: #8b3a3a
Teal: #4a7a6b
```

## Configuration Options

### UI Configuration
| Property | Type | Range |
|----------|------|-------|
| fontSize | number | 10-24px |
| fontWeight | number | 400-700 |
| buttonBorderRadius | number | 0-24px |
| containerPadding | number | 8-32px |
| Colors | hex | Any #XXXXXX |

### Product State
| Property | Type |
|----------|------|
| name | string |
| price | number |
| color | hex color |
| material | string |

## Design Decisions

1. **CSS Hue-Rotate**: Single image with color filtering instead of image swapping (faster, offline-compatible)
2. **Responsive Layout**: Conditional rendering for mobile/desktop (cleaner code, better UX)
3. **Mobile Button Placement**: "View in room" icon on right to avoid overlap with settings button
4. **Panel Toggle**: Settings button hides/shows customization panel on mobile for full product view
5. **Clean Thumbnails**: No overlays or colored borders (minimal aesthetic, focus on product)
6. **Local Images**: Project images instead of external URLs (faster loading, offline support)
7. **Real-time Preview**: All changes apply instantly (better engagement, instant feedback)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Getting Started

1. **Add Images**: Place chair images in `public/images/products/chair/`:
   - front.jpg
   - 45degrees.jpg
   - side.jpg
   - back.jpg
   - down.jpg

2. **Start Dev Server**: `npm start`

3. **Customize**: Use Product View to test color/zoom controls

4. **Deploy**: Connect to Vercel for automatic deployments

## Performance

- Single image file (hue rotation)
- Minimal re-renders (Zustand)
- Local images (no network delay)
- CSS transforms (smooth animations)


## Author

Shreyas Aini
