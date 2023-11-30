import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Interpolation } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      greyTertiary: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      greyPrimary: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      greyprimary: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      greenSecondary: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      greenPrimary: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      primary: string;
      secondary: string;
      black: string;
      white: string;
      txtPrimary: string;
      txtSecondary: string;
      txtTertiary: string;
    };
    shadow: {
      primary: string;
      secondary: string;
    };
    border: {
      black: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      white: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      primary: string;
    };
    background: {
      lightGreen: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      greenPrimary: Interpolation<
        FastOmit<
          DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          never
        >
      >;
      greyPrimary: string;
    };
    gradient: {
      primary: string;
    };
  }
}
export interface IImgTag {
  $imgfit: "contain" | "cover";
}
export interface IButton {
  $icon?: "left" | "right";
}
export interface sidebarListContainer {
  routeId: boolean;
}
export interface dropdownListItem {
  $id: boolean;
  $colorState: boolean;
  $dropdownState: boolean;
}
export interface CardContainer {
  slider: boolean;
  offerState: boolean;
}

export interface ProductTypes {
  id: string;
  name: string;
  products: any[];
}

export interface ListTitleText {
  fontSize?: string;
  marginBottom?: string;
}

export interface CategoryProducts {
  id?: string;
  name?: string;
  products: any[];
}

export interface StyleLink {
  variant?: string;
}

export interface CardContainerI {
  slider?: string;
  available?: number;
}

export interface TitleProps {
  fontSize?: string;
  color?: string;
  padding?: string;
  fontWeight?: number | string;
}

export interface FlexBoxProps {
  width?: string;
  height?: string;
}

export interface ProductTypesI {
  id: string;
  name: string;
  image: string;
  isActive: boolean;
}

export interface CategoryI {
  id:string;
  image:string;
  isActive:boolean;
  name:string;
  defaultRoute:string;
  productTypes:[{id:string}]
}