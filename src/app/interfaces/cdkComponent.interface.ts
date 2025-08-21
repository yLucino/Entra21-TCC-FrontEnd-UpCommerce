import { ComponentStyles } from "./componentSyles.interface";

export interface CdkComponent {
  id: string;
  cdkId: string;
  styles: ComponentStyles;
  children?: CdkComponent[];
}
