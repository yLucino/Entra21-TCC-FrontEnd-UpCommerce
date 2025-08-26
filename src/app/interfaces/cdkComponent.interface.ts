import { ComponentStyles } from "./componentSyles.interface";

export interface CdkComponent {
  id: string;
  cdkId: string;
  parentCdkId: string | null;
  style: ComponentStyles;
  children: CdkComponent[];
}
