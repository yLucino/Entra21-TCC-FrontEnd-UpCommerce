import { CdkComponent } from "./cdkComponent.interface";

export interface ProjectInterface {
  urlLogo: string;
  title: string;
  subTitle: string;
  description: string;
  component?: CdkComponent[];
}