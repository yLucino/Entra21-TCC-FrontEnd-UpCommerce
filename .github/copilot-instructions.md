# Copilot Instructions for UpCommerce FrontEnd

## Project Overview
- This is an Angular-based frontend for "UpCommerce", part of the Entra21 TCC project.
- The codebase is organized by feature, with reusable components in `src/app/Components/`, services in `src/app/services/`, and interfaces in `src/app/interfaces/`.
- The UI is responsive, supporting Desktop, Laptop, Tablet, and Mobile layouts. See `src/assets/images/Preview/` for design references.

## Key Architectural Patterns
- **Component-Driven:** Each UI feature is a self-contained Angular component. Example: `properties-workshop`, `card-layouts`, `login`, etc.
- **Service Layer:** Shared logic and state (e.g., selected elements, property updates) are managed via Angular services, e.g., `property.service.ts`.
- **Dynamic Styling:** Components like `properties-workshop` use direct DOM manipulation and dynamic CSS injection for real-time style editing (see `updateStyle`, `updateHoverStyle`).
- **Drag-and-Drop:** Custom drag-and-drop logic is implemented in `src/app/dragAndDrop/` and interfaces in `src/app/interfaces/`.

## Developer Workflows
- **Install:**
  ```bash
  npm install
  ```
- **Run (dev server):**
  ```bash
  npm start
  ```
- **Test:**
  ```bash
  npm test
  ```
- **Build:**
  ```bash
  ng build
  ```
- **Debug:** Use browser dev tools; inspect dynamic styles and DOM changes, especially for live-editing features.

## Project-Specific Conventions
- **Style Manipulation:** Use `updateStyle` and `updateHoverStyle` methods for changing element styles. These methods handle both inline styles and dynamic CSS rules.
- **Component Selection:** State for selected components is managed via `PropertyService`. Always update the service when changing selection or properties.
- **Color Handling:** Colors are converted from RGB to HEX using the `rgbToHex` utility in components.
- **Max Width/Height:** UI elements have enforced max dimensions based on parent container padding (see `maxWidth`, `maxHeight` logic in `properties-workshop.component.ts`).
- **Hover Effects:** Custom hover styles are injected via `<style>` tags with unique class names per element.

## Integration Points
- **Assets:** Images and icons are stored in `src/assets/images/` and referenced in components and documentation.
- **External Dependencies:**
  - Angular
  - TypeScript
  - Custom CSS/SCSS (`custom-theme.scss`, `styles.css`)

## Examples
- To update a component's style dynamically:
  ```typescript
  this.updateStyle('font-size', 18);
  this.updateHoverStyle('background-color', '#ff0000');
  ```
- To access selected element state:
  ```typescript
  this.propertyService.getSelectedElement().subscribe(...);
  ```

## References
- Main entry: `src/main.ts`
- App module: `src/app/app.module.ts`
- Routing: `src/app/app-routing.module.ts`
- Example component: `src/app/Components/properties-workshop/properties-workshop.component.ts`
- Service: `src/app/services/property.service.ts`

---
For questions about unclear patterns or missing documentation, ask for feedback and iterate on this file.
