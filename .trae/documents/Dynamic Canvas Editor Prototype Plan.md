I will build a functional frontend prototype for the **Dynamic Canvas Editor** using Next.js and Tailwind CSS. This prototype will focus on the interactive "Design Phase" and "Configuration Phase" mentioned in your plan.

### 1. Setup & Dependencies
-   **Tailwind CSS**: Install and configure for rapid UI development.
-   **dnd-kit**: Install `@dnd-kit/core` and related packages for robust drag-and-drop interactions.
-   **Icons**: Install `lucide-react` for UI icons.
-   **Utilities**: Install `clsx` and `tailwind-merge` for class management.

### 2. Page Structure
Create a new route `src/app/(frontend)/[locale]/canvas/page.tsx` with a 3-column layout:
-   **Left Sidebar (Component Palette)**:
    -   List of available components (Text, Image, QR Code, Shape).
    -   Draggable items to add to the canvas.
-   **Center (Canvas Area)**:
    -   A fixed-size container (poster area).
    -   Droppable zone where components are rendered.
    -   Interactive components (selectable, draggable within canvas).
-   **Right Sidebar (Properties Panel)**:
    -   Context-aware controls based on the selected component.
    -   **Static/Dynamic Toggle**: A switch to demonstrate the core "Dynamic Parameter" feature.
    -   Basic inputs: Content, Color, Position, Dimensions.

### 3. Key Interactions (Prototype)
-   **Add Component**: Drag from Left Sidebar -> Drop on Canvas.
-   **Select Component**: Click a component on the canvas to highlight it and show its properties in the Right Sidebar.
-   **Move Component**: Drag components around within the canvas.
-   **Edit Properties**: Change text or color in the Right Sidebar and see real-time updates on the Canvas.
-   **Dynamic Binding**: Toggle a property to "Dynamic" mode (visual indication of binding, e.g., showing `{{variable}}`).

### 4. Implementation Details
-   **State Management**: Use React local state to manage the list of canvas elements: `CanvasElement[]`.
-   **Mock Components**: Implement basic visual representations for Text, Image (placeholder), and Rectangles.

This plan focuses purely on the **frontend interaction** as requested, simulating the core value proposition without backend complexity.