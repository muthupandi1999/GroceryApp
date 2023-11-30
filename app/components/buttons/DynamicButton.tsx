import React from "react";
import styled from "styled-components";
import { FlexBox } from "@/app/assets/style/commonStyles";
import { FlexBoxProps } from "@/app/assets/style/interface";

let Button = styled.button`
  width: ${(props: any) => props.width || "100px"};
  height: ${(props: any) => props.height || "30px"};
  color: ${(props: any) => props.color || "green"};
  background-color: ${(props: any) => props.backgroundColor || "#fff"};
  font-size: ${(props: any) => props.fontSize || "14px"};
  text-align: center;
  border: 0;
  border-radius: 5px;
`;

function DynamicButton({ name, color, backgroundColor }: Readonly<{ name: string, color?:string, backgroundColor?:string }>) {
  return <Button style={{backgroundColor:backgroundColor}} color={color}>{name}</Button>;
}

export default DynamicButton;
