"use client";
import { createGlobalStyle, styled } from "styled-components";
//Interface
import {
  CardContainerI,
  IButton,
  IImgTag,
  ListTitleText,
  StyleLink,
  dropdownListItem,
  sidebarListContainer,
} from "./interface";
//Next Tags
import Image from "next/image";
//Colors
import { white } from "./themeColor";
import { Grid, Popover } from "@mui/material";
// font-family: 'Open Sans', sans-serif;
export const GlobalStyle = createGlobalStyle`
    body{
      font-family: 'Radio Canada', sans-serif;
        font-size:14px;
    }
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
    h1,h2,h3,h4,h5,h6{
        color:${(props) => props.theme.color.txtPrimary};
        text-transform:capitalize;
    }
    p{
        color:${(props) => props.theme.color.txtSecondary}
    }
    li, button, i, span, a{
      font-family: 'Open Sans', sans-serif;
      text-decoration:none;
      list-style:none;
    }
    button{
      cursor:pointer;
    }
    input, button{
        &:focus{
            outline:none;
        }
    }

  .hiddenList{
    display:flex;
    flex-direction:column;

  }


:root {
	--hue: 223;
	--bg: hsl(var(--hue),10%,90%);
	--fg: hsl(var(--hue),10%,10%);
	--primary: hsl(var(--hue),90%,55%);
	--trans-dur: 0.3s;
	font-size: calc(16px + (20 - 16) * (100vw - 320px) / (1280 - 320));
}

.preloader {
	text-align: center;
	max-width: 20em;
	width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
.preloader__text {
	position: relative;
	height: 1.5em;
}
.preloader__msg {
	animation: msg 0.3s 13.7s linear forwards;
	position: absolute;
	width: 100%;
}
.preloader__msg--last {
	animation-direction: reverse;
	animation-delay: 14s;
	visibility: hidden;
}
.cartLoader {
	display: block;
	margin: 0 auto 1.5em auto;
	width: 8em;
	height: 8em;
}
.cart__lines,
.cart__top,
.cart__wheel1,
.cart__wheel2,
.cart__wheel-stroke {
	animation: cartLines 2s ease-in-out infinite;
}
.cart__lines {
	stroke: var(--primary);
}
.cart__top {
	animation-name: cartTop;
}
.cart__wheel1 {
	animation-name: cartWheel1;
	transform: rotate(-0.25turn);
	transform-origin: 43px 111px;
}
.cart__wheel2 {
	animation-name: cartWheel2;
	transform: rotate(0.25turn);
	transform-origin: 102px 111px;
}
.cart__wheel-stroke {
	animation-name: cartWheelStroke
}
.cart__track {
	stroke: hsla(var(--hue),10%,10%,0.1);
	transition: stroke var(--trans-dur);
}

@media (prefers-color-scheme: dark) {
	:root {
		--bg: hsl(var(--hue),10%,10%);
		--fg: hsl(var(--hue),10%,90%);
	}
	.cart__track {
		stroke: hsla(var(--hue),10%,90%,0.1);
	}
}

@keyframes msg {
	from {
		opacity: 1;
		visibility: visible;
	}
	99.9% {
		opacity: 0;
		visibility: visible;
	}
	to {
		opacity: 0;
		visibility: hidden;
	}
}
@keyframes cartLines {
	from,
	to {
		opacity: 0;
	}
	8%,
	92% {
		opacity: 1;
	}
}
@keyframes cartTop {
	from {
		stroke-dashoffset: -338;
	}
	50% {
		stroke-dashoffset: 0;
	}
	to {
		stroke-dashoffset: 338;
	}
}
@keyframes cartWheel1 {
	from {
		transform: rotate(-0.25turn);
	}
	to {
		transform: rotate(2.75turn);
	}
}
@keyframes cartWheel2 {
	from {
		transform: rotate(0.25turn);
	}
	to {
		transform: rotate(3.25turn);
	}
}
@keyframes cartWheelStroke {
	from,
	to {
		stroke-dashoffset: 81.68;
	}
	50% {
		stroke-dashoffset: 40.84;
	}
}
  
`;
export const ImgTag = styled(Image)<IImgTag>`
  object-position: center;
  display: block;
  ${(props) =>
    props.$imgfit === "cover" &&
    `
    object-fit: cover;
`}
  ${(props) =>
    props.$imgfit === "contain" &&
    `
    object-fit: contain;
`}
`;
export const Button = styled.button<IButton>`
  background: ${(props) => props.theme.gradient.primary};
  color: ${white};
  font-weight: 700;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  box-shadow: 0px 5px 10px rgb(33 167 131 / 28%);
  transition-duration: 0.3s;
  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.$icon &&
    `
     ${
       props.$icon === "left" &&
       `
        svg{
          margin-right:5px;
        }
     `
     }
     ${
       props.$icon === "right" &&
       `
        svg{
          margin-left:5px;
        }
     `
     }
  `}
`;
export const LogoSec = styled.div`
  ${ImgTag} {
    width: 135px;
    height: 30px;
  }
`;
export const LocationSec = styled.div`
  max-width: 275px;
  min-width: 175px;
  overflow: hidden;

  border-left: 1px solid ${(props) => props.theme.border.primary};
  @media only screen and (max-width: 1000px) {
    border: 0;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 3px;
  }
  .contentSec {
    display: flex;
    align-items: center;
    .content {
      font-size: 13px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 45px;
  width: 100%;
  max-width: 1120px;
  input {
    border-radius: 12px;
    width: 100%;
    height: 100%;
    border: 1px solid ${(props) => props.theme.border.primary};
    background: ${(props) => props.theme.background.greyPrimary};
    padding-left: 40px;
    &::-webkit-input-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
    &::-moz-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
    &:-ms-input-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
    &:-moz-placeholder {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.txtTertiary};
    }
  }
  .searchIcon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
  }
`;
export const SearchSec = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
`;
export const HeaderRightSec = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1020px) {
    justify-content: flex-end;
  }
  @media only screen and (max-width: 1000px) {
    display: none;
  }
  .buttonLink {
    border: none;
    background: unset;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    transition-duration: 0.3s;
    svg {
      margin-right: 5px;
      font-size: 20px;
    }
    &:hover {
      color: ${(props) => props.theme.color.primary};
    }
  }
  button {
    margin-left: 25px;
    margin-right: 25px;
    @media only screen and (max-width: 1300px) {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  .Accounts {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    position: relative;
  }
  .AddressBox {
    position: relative;
  }
`;
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
  }
  ${LogoSec}, ${LocationSec}, ${SearchSec} {
    padding: 15px 25px;
  }
  ${LocationSec}, ${SearchSec} {
    @media only screen and (max-width: 1300px) {
      padding: 15px 5px;
    }
  }
  ${LogoSec} {
    @media only screen and (max-width: 1000px) {
      display: none;
    }
  }
  ${SearchSec} {
    width: 100%;
  }
`;
export const LocationWrapper = styled.div`
display:flex;

align-items-center;
justify-content:space-between;
@media  only screen and (max-width:1000px){
  width:100%;
 }
.login{
  display:none;
@media  only screen and (max-width:1000px){
  display:flex;
  align-items:center;
  justify-content:center;
 }
}
`;
export const HeaderContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
`;
export const ChildContainer = styled.div`
  max-width: 1300px;
  margin: 120px auto 0;
  padding-right: 60px;

  @media only screen and (max-width: 1300px) {
    padding-right: 0;
    margin: 120px 20px 0 20px;
  }
  @media only screen and (max-width: 1000px) {
    padding-right: 0;
    margin: 185px 20px 0 20px;
  }
`;
//category
export const CategoryNavContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 82px;
  left: 0;
  right: 0;
  z-index: 1;
  .navList {
    max-width: 1430px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    padding: 0 60px;
  }
`;
export const NavListItem = styled.a`
  padding: 14px 13px;
  text-decoration: none;
  color: ${(props) => props.theme.color.greyTertiary};
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.background.greyPrimary};
  }
`;
export const CategoryHiddenListPopper = styled(Popover)`
  top: 1px;
  position: absolute;
  top: 10%;
  right: 10%;
  overflow: auto;
  .hiddenList {
    width: 200px;
    height: 690px;
    overflow: auto;
  }
`;
export const CategoryContainer = styled.div`
  margin-top: 131px;
  display: flex;
  height: 100%;
  position: relative;
  height: 90vh;
  overflow: auto;
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  border-right: 1px solid ${(props) => props.theme.border.primary};

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const CategorySidebarContainer = styled.div`
  width: 250px;
  position: sticky;
  top: 0;

  border-left: 1px solid ${(props) => props.theme.border.primary};
  border-right: 1px solid ${(props) => props.theme.border.primary};
  overflow: auto;
`;
export const SideBarListContainer = styled.div<sidebarListContainer>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.routeId ? props.theme.background.lightGreen : ""};
  border-left: 4px solid
    ${(props) =>
      props.routeId ? props.theme.background.greenPrimary : "transparent"};
  .img-container {
    width: 48px;
    height: 48px;
    overflow: hidden;
    background-color: #f8f8f8;
    border-radius: 12px;
  }
  .subtitle {
    color: ${(props) => props.theme.color.black};
    font-size: 14px;
    text-transform: capitalize;
  }
`;
export const CategoryContentContainer = styled.div`
  width: 100%;

  .NodataFoundText {
    position: absolute;
    top: 50%;
    left: 55%;
  }

  .content-header {
    background: white;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: none;
    border-bottom: 1px solid ${(props) => props.theme.border.primary};
    border-left: 1px solid ${(props) => props.theme.border.primary};

    border-right: 1px solid ${(props) => props.theme.border.primary};

    h1 {
      font-size: 16px;
    }
    .sort {
      display: flex;
      align-items: center;
      gap: 15px;
      .dropDown {
        position: relative;
        z-index: 5;
        .select-options {
          background-color: ${(props) => props.theme.color.white};
          position: absolute;
          border: 1px solid ${(props) => props.theme.border.primary};
          width: 100%;
          transition: all 0.5s ease-in-out;
        }
      }
    }
  }
`;
export const DropDownListItem = styled.li<dropdownListItem>`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 1px solid
    ${(props) => (props.$id ? "transparent" : props.theme.border.primary)};
  color: ${(props) => (props.$colorState ? "green" : "")};

  span {
    display: flex;
    alignitems: center;
  }
`;
export const CustomSelectField = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 32px;
  border: 1px solid ${(props) => props.theme.border.primary};
  border-radius: 4px;
  color: ${(props) => props.theme.color.greenPrimary};
  font-weight: 600;
`;
export const CategoryGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  background-color: ${(props) => props.theme.background.greyPrimary};
  @media only screen and (max-width: 1020px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CardContainer = styled.div<CardContainerI>`
  width: ${(props) => (props.slider ? "95%" : "100%")};
  position: relative;
  padding: 0 10px 10px;
  border: 1px solid #e8e8e8;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 2px 2px 8px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.available ? 0.5 : 1)};
  .img-container {
    display: flex;
    justify-content: center;
    position: relative;
    .img-wrapper {
      width: 100%;

      object-fit: fill;
      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }

  .unitDiv {
    display: flex;
    align-items: center;
    height: 26px;
    color: #666666;
    font-size: 12px;
    margin-bottom: 24px;
    
  }
  
  .StockOutBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    color: #fff;
    width: 80px;
    height: 20px;
    font-size: 10px;
    border: none;
    border-radius: 10px;
  }

  .productUnit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
    padding: 7px;
    margin-bottom: 14px;
    border-radius: 4px;
    .unit {
      font-size: 12px;
    }
    .unitIcon {
      color: #785e5e;
    }
  }
  

  }

  .modelBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    border: none;
    border-radius: 10px;
    padding: 16px;
    background-color: #f4f6fb;
    @media only screen and (max-width: 560px) {
      width: 300px;
    }

  .title {
    height: 36px;
  }

`;

export const CardFooder = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .priceBox {
    display: flex;
    flex-direction: column;
  }
`;
export const OutOfStock = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  right: 20%;
  text-align: center;
  background-color: black;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

//products

export const ProductContainer = styled.div`
  display: flex;

  justify-content: center;
  position: relative;
  height: 100vh;
  overflow: auto;
  overflow-x: visible;

  @media only screen and (max-width: 1000px) {
    display: block;
  }
`;
export const ProductLeftSection = styled.div`
  width: 50%;
  height: fit-content;
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  display: flex;
  align-items: center;

  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.border.primary};
  // margin-top: 90px;
  .productViewer {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .slick-prev,
    .slick-next {
      display: block;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
        rgba(0, 0, 0, 0.14) 0px 6px 10px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
      border-radius: 50%;
      width: 34px;
      height: 34px;
    }
    .slick-prev:before,
    .slick-next:before {
      content: "";
    }
    .slick-prev {
      background-image: url(https://cdn-icons-png.flaticon.com/512/271/271220.png);
      left: -50px;
    }

    .slick-arrow.slick-prev.slick-disabled {
      display: none !important;
    }
    .slick-arrow.slick-next.slick-disabled {
      display: none !important;
    }
    .slick-next {
      background-image: url(https://cdn-icons-png.flaticon.com/512/32/32213.png) !important;
    }
    .perimeter {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .image {
      width: 500px;
      height: 500px;

      display: flex;
      gap: 20px;

      align-items: center;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;
export const SliderWrapper = styled.div`
  width: 80%;
  height: 100%;
`;
export const SliderImageContainer = styled.div<{ $imageUrl: URL; $url: URL }>`
  width: 64px !important;
  height: 64px;
  object-fit: fill;
  border-radius: 8px;
  border: ${(props) =>
    props.$imageUrl !== props.$url ? "1px solid #f2f2f2" : "1px solid #0c831f"};

  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
  }
`;
export const DetailsContainer = styled.div`
  max-width: 100%;
  //   margin-left: 20%;
  margin-bottom: 28px;
  border-top: 1px solid #f2f2f2;
  padding-right: 20px;
  .list-container {
    margin: 12px 0;
  }
`;
export const ProductRightSection = styled.div`
  width: 50%;
  position: sticky;
  top: 0;
  padding: 70px 0 0 48px;
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  height: 100%;
  .productInfo {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .viewCategory {
      border-bottom: 1px solid ${(props) => props.theme.border.primary};
      padding: 10px 0 15px 0;
      a {
        color: ${(props) => props.theme.color.greenPrimary};
        font-size: 18px;
        text-decoration: none;
        display: flex;
        align-items: center;
      }
      .right-arrow {
        color: ${(props) => props.theme.color.greenPrimary};
        font-size: 12px;
      }
    }
    .product-info-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .quantity {
        color: #4f4f4f;
        margin: 5px 0;
        font-weight: 600;
        font-size: 12px;
      }
      .price {
        margin: 5px 0;
        font-weight: 500;
        color: ${(props) => props.theme.color.black};
        span {
          font-weight: 700;
        }
      }
    }
  }
  .benefits {
    h4 {
      font-size: 16px;
      color: ${(props) => props.theme.color.black};
      padding-top: 24px;
      margin: 0;
      font-weight: 600;
    }
    .benefitlistContainer {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 20px 0;
      .list-wrapper {
        display: flex;
        .icon {
          margin-right: 20px;
          width: 64px;
          height: 64px;
          object-fit: fill;
          img {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
        .content {
          display: flex;
          justify-content: center;
          flex-direction: column;
          p {
            font-size: 12px;
            color: ${(props) => props.theme.color.black};
            margin-bottom: 4px;
          }
          span {
            font-size: 12px;
            color: ${(props) => props.theme.color.greyTertiary};
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const TitleTag = styled.h3<{ variant: string }>`
  color: ${(props) => props.theme.color.black};
  font-weight: ${(props) => (props.variant === "productTitle" ? 700 : 600)};
  font-size: 24px;
  text-transform: capitalize;
  padding: ${(props) =>
    props.variant === "detailsTitle"
      ? " 32px 0 16px"
      : props.variant === "cardTitle"
      ? "16px 0"
      : 0};
`;
export const ProductTimerCard = styled.div<{ variant: string }>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 4px 1px;
  border-radius: 4px;
  font-weight: 700;
  color: ${(props) => props.theme.color.black};
  background-color: ${(props) => props.theme.background.greyPrimary};
  font-size: ${(props) => (props.variant === "forCard" ? "9px" : "12px")};
  width: 70px;
  img {
    width: 11px;
    height: 11px;
  }
`;
export const CustomAddButton = styled.button<{ $count: number }>`
  font-size: 13px;

  width: 66px;
  height: 31px;
  border: 2px solid #bf4f74;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$count !== 0 ? "green" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$count !== 0 ? "white" : "#318616")};
  border: 1px solid #318616;
  font-weight: 600;
  gap: 5px;
`;

export const ListTitle = styled.p<ListTitleText>`
  margin-bottom: ${(props: any) => props.marginBottom || "8px"};
  font-size: ${(props: any) => props.fontSize || "14px"};
  font-weight: 600;
  line-height: 18px;
  color: ${(props: any) => props.theme.color.black};
  text-transform: capitalize;
  min-height: 36px;
  white-space: wrap;
  width: 80%;
  overflow: hidden;
  max-height: 36px;
  text-overflow: ellipsis;
`;

//home page
export const Wrapper = styled.section`
  margin: auto;
`;

export const CategoryFlexBox = styled.section`
  padding: 20px 0 60px 0;
`;

export const Banner = styled.section`
  background-image: url(https://groca.myshopify.com/cdn/shop/files/slider-3.jpg?v=1614918563);
  background-repeat: no-repeat;
  background-size: cover;
  height: 15rem;
  background-size: cover;
  background-position: 40% 60%;
  margin-bottom: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media only screen and (max-width: 480px) {
    height: 8rem;
  }
`;

export const BannerInfo = styled.section`
  margin-right: 10px;
`;

export const BannerText = styled.section`
  font-size: 35px;
  font-weight: 700;
  color: #666666;
  padding-bottom: 20px;
  @media only screen and (max-width: 960px) {
    font-size: 25px;
    padding-bottom: 10px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 18px;
    padding-bottom: 10px;
  }
`;

export const BannerSubText = styled.section`
  font-size: 30px;
  color: #64a125;
  padding-bottom: 30px;
  @media only screen and (max-width: 480px) {
    font-size: 15px;
    padding-bottom: 15px;
  }
`;

export const CategoryProductSliderWrapper = styled.div`
  .slick-prev,
  .slick-next {
    display: block;
    position: absolute;
    background-size: 15px 15px;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    background-color: white;
  }
  .slick-prev:before,
  .slick-next:before {
    content: "";
  }
  .slick-prev {
    background-image: url(https://cdn-icons-png.flaticon.com/512/271/271220.png);
    left: -8px;
    z-index: 1;
  }

  .slick-arrow.slick-prev.slick-disabled {
    display: none !important;
  }
  .slick-arrow.slick-next.slick-disabled {
    display: none !important;
  }
  .slick-next {
    background-image: url(https://cdn-icons-png.flaticon.com/512/32/32213.png) !important;
    right: -11px;
  }
`;
export const CategoryImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  --auto-grid-min-size: 5rem;
  grid-gap: 0.5rem;
  @media screen and (max-width: 1020px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
  .categoryCartBox {
    background: #efefef;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 20px;
  }
  .img-container {
    width: 70px;
    height: 70px;
    overflow: hidden;
    object-fit: fill;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
  }
`;
//cards
export const CampaignCardWrapper = styled.section`
  width: 95%;
  border-radius: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;
  cursor: pointer;

  h4 {
    font-size: 25px;
    width: 80%;
    padding: 30px 0 10px 30px;
    color: #fff;
    font-weight: 500;
  }
  h5 {
    font-size: 18px;
    width: 80%;
    padding: 0 0 10px 30px;
    color: #fff;
    font-weight: 500;
  }
  .orderButton {
    padding: 20px 0 20px 30px;
  }
`;

export const ProductImageContainer = styled.section`
  border: 1px solid rgb(242, 242, 242);
  border-radius: 8px;
  height: 70px;
  width: 70px;
`;
export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;
export const ProductWrapper = styled.section`
  display: flex;
  padding-top: 20px;
  justify-content: flex-start;
  position: relative;
  gap: 20px;
`;

export const ProductInfoDetails = styled.section`
  padding: 0;
  width: 70%;
`;

export const AddToCartButton = styled.section`
  cursor: pointer;
  width: 66px;
  border: 1px solid rgb(49, 134, 22);
  height: 31px;
  font-weight: 600;
  font-size: 13px;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  background-color: #318616;
  color: rgb(255, 255, 255);
  justify-content: space-between;
  padding: 6px;
  position: absolute;
  top: 40%;
  right: 0;
`;

export const CaregoryCardWrapper = styled.section`
  margin: 30px 0;
  background: #f0f8ff;
  width: 94%;
  border-radius: 30px;
  .categoryText {
    font-size: 14px;
    text-align: center;
    width: 90%;
    line-height: 16px;
    font-weight: 600;
    margin: auto;
    word-wrap: break-word;
    min-height: 52px;
    padding: 10px 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: none;
  }
`;

//footer
export const FooterContainer = styled(Grid)`
  margin: 48px auto auto;
`;

export const Rights = styled.section`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #e6e6e6;
  padding: 10px 20px;
  border-radius: 10px;
  .Icon {
    margin: 0 4px;
    cursor: pointer;
  }
`;

export const StyledLink = styled.li<StyleLink>`
  font-size: ${(props) => (props.variant === "categoryLink" ? "16px" : "14px")};
  text-transform: capitalize;
  margin: 5px 0;
  color: ${(props) => props.theme.color.greyTertiary};
`;
export const LinksTitleTag = styled.h3`
  color: ${(props) => props.theme.color.black};
  font-weight: 600;
  font-size: 18px;

  padding: 24px 0;
  span {
    color: ${(props) => props.theme.color.greenPrimary};
    margin-left: 20px;
    text-transform: lowercase;
  }
`;
export const ProductCategoryName = styled.text`
  color: rgb(28, 28, 28);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  padding: 16px 0;
`;

export const SeeAllText = styled.text`
  line-height: 32px;
  font-size: 20px;
  color: rgb(12, 131, 31);
  padding: 16px 0;
  cursor: pointer;
`;

export const HiddlenNavList = styled.section`
  position: absolute;
  z-index: 50;
  top: 48px;
  right: 0px;
  background-color: #fff;
  border: 1px solid #eee;
  .hiddenList {
    width: 160px;
    height: 300px;
    overflow: auto;
    "::-webkit-scrollbar": {
      width: "0.5rem";
    }
  }
`;

//Login card

export const LoginModelContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .imageBox {
    width: 100px;
    height: 100px;
    object-fit: cover;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h3 {
    font-size: 15px;
    color: #000;
    padding: 10px 0 5px 0;
    font-weight: 700;
  }
  h4 {
    color: #333333;
    padding-bottom: 10px;
    a {
      font-size: 12px;
      color: #333333;
      padding: 0;
      font-weight: 700;
    }
  }
  .PhoneNoBox {
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 13px;
    color: #333;
    position: relative;
    width: 80%;
    padding: 15px 20px 15px 50px;
    .PhoneNoInput {
      border: 0;
    }
    .phoneNoPrefix {
      position: absolute;
      left: 5%;
      top: 31%;
    }
  }
  .loginButton {
    margin-top: 18px;
    color: rgb(255, 255, 255);
    border-radius: 12px;
    border: none;
    outline: none;
    font-size: 14px;
    text-align: center;
    padding: 16px;
    font-weight: 500;
    width: 80%;
    background-color: rgb(156, 156, 156);
    cursor: pointer;
    min-height: 50px;
  }
  .policy {
    text-align: center;
    padding: 12px 0px 0 0;
    font-size: 10px;
  }
  .backicon {
    position: absolute;
    left: 0%;
    top: 0%;
  }
  .backiconVerify {
    position: absolute;
    left: 0%;
    top: 4.5%;
  }

  .successpage {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px 0;
    border: none;
    .successIcon {
      font-size: 30px;
      color: #0c831f;
      margin: 20px 0;
    }
    h3 {
      font-size: 20px;
      color: #0c831f;
    }
  }
`;
export const VerifyBox = styled.section`
  width: 100%;
  .title {
    padding: 14px 0px 12px 0;
    text-align: center;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  .verifyDetails {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .resentText {
    color: #0c831f;
    padding: 24px 0;
    &:hover {
      text-decoration: underline;
    }
  }
  .otpBox {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0 0 0;
    .otpInputBox {
      width: 12%;
      height: 40px;
      border-radius: 6px;
      border: 1px solid #eee;
      text-align: center;
    }
  }
`;
