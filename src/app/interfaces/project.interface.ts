import { CdkComponent } from "./cdkComponent.interface";

export interface ProjectInterface {
  id?: number;
  userId?: number;
  urlLogo: string;
  title: string;
  subTitle: string;
  description: string;
  component?: CdkComponent[];
}