import { ComponentStyles } from "./componentSyles.interface";

export interface CdkComponent {
  id: string;
  type: string;
  styles: ComponentStyles;
  children?: CdkComponent[];
}
