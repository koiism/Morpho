export type ComponentType = 'text' | 'image' | 'qr' | 'shape';

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string; // For text
  src?: string; // For image
  color?: string; // For shape/text
  isDynamic: boolean;
  dynamicKey?: string; // e.g., 'user_name'
}

export type DraggableItemType = {
  type: ComponentType;
  label: string;
  icon: React.ReactNode;
};
