import styled from "styled-components";
import { FlexBoxProps } from "./interface";

export let Container = styled.section`
    max-width:1280px;
    margin:auto;
    padding-bottom:20px;
    
`

export const FlexBox = styled.section<FlexBoxProps>`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:${(props: any) => props.width || "100%"};
    height:${(props: any) => props.height || "100%"};
    margin:auto;
`