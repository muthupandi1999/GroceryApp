import React, { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CartProductCart from "./cards/CartProductCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AddToCartProductSliderSettings } from "../utils/data";

import { TitleProps } from "../assets/style/interface";
import { fetchCartItems } from "../service/api";

export const Text = styled.h1<TitleProps>`
  margin: 0;
  font-size: ${(TextProps: any) => TextProps.fontSize || "15px"};
  color: ${(TextProps: any) => TextProps.color || "#000"};
  padding: ${(TextProps: any) => TextProps.padding || "0"};
  font-weight: ${(TextProps: any) => TextProps.fontWeight || 700};
`;

export const SubText = styled.h1<TitleProps>`
  margin: 0;
  font-size: ${(props: any) => props.fontSize || "12px"};
  color: ${(props: any) => props.color || "#666666"};
  padding: ${(props: any) => props.padding || "0"};
  font-weight: ${(props: any) => props.fontWeight || "normal"};
  line-height: 16px;
`;

export const BlockDiv = styled.section`
  display: block;
`;

const TitleWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 18px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 5;
`;

const Container = styled.section`
  background: #f5f7fc;
  position: relative;
`;

const CartWrapper = styled.section`
  padding: 0 12px;
  background: #fff;
  margin: 12px;
  border-radius: 10px;
  padding: 12px 12px;
`;

const BillWrapper = styled.section`
  margin: 12px 12px 0 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px 10px 0 0;
`;

const ProductSuggestWrapper = styled.section`
  margin: 12px 12px 0 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px 10px 0 0;
`;
const PolicyWrapper = styled.section`
  margin: 12px 12px 0 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
`;

const ProceedButton = styled.section`
  background-color: #318616;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProceedWrapper = styled.section`
  padding: 12px;
  border-radius: 10px;
  background: #fff;
  color: #fff;
  position: sticky;
  margin-top: 12px;
  bottom: 0;
  z-index: 5;
`;

const BillFlex = styled.section`
  display: flex;
  justify-content: space-between;
`;

const DeliveryImage = styled.img`
  width: 48px;
  height: 48px;
`;

const DeliveryInfo = styled.section`
  padding-left: 16px;
`;
const FlexObject = styled.section`
  display: flex;
`;

const DeliveryImageContainer = styled.section`
  background: linear-gradient(
      to right,
      rgb(248, 248, 248) 0%,
      rgb(255, 255, 255) 10%,
      rgb(248, 248, 248) 40%,
      rgb(248, 248, 248) 100%
    )
    no-repeat rgb(248, 248, 248);
  opacity: 1;
  transition: opacity 0.25s ease-out 0s;
  will-change: opacity;
  border-radius: inherit;
  animation: 1.5s linear 0s infinite normal forwards running cypEgR;
`;

const DrawerBox = styled.section`
  width: 400px;
  @media (max-width: 425px) {
    width: 320px !important;
  }
`;

const WrapperBillText = styled.section`
  padding-bottom: 4px;
`;

const CouponNote = styled.section`
  color: rgb(130, 130, 130);
  padding: 8px 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: rgb(252, 252, 252);
  font-weight: 500;
  margin: 0 12px;
`;

export const CartDrawer = (props: any) => {
  const { open, anchor, onClose } = props;
  const [carts, setCarts] = useState<any>([]);
  // const [loadGreeting, { refetch }] = useLazyQuery(GetAddToCarts, {
  //   variables: {
  //     userId: "655379d96144626a275e8a14",
  //   },
  // });

  const { cartProducts, getUserCartRefetch } = fetchCartItems(
    "65642fcb264c4f37a0b129be"
  ) as any;
  console.log("cartProducts", cartProducts);
  useEffect(() => {
    getUserCartRefetch();
    setCarts(cartProducts?.getAddToCartsByUserId?.carts)
    // console.log("cartProducts123", cartProducts);
  }, [cartProducts]);

  console.log("cartProductscartProducts", cartProducts)

  let disCountAmount = cartProducts?.getAddToCartsByUserId?.carts?.reduce((acc: any, index: any) => {
    return (
      acc +
      index?.quantity *
        (index.selectedVariant?.price *
          (index.product?.dicountPercentage / 100))
    );
  }, 0);
  console.log("disCountAmount", disCountAmount);
  // if(AddTOCartLoading){return <p>Loading....</p>}
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawerBox style={{ width: "400px" }}>
        <Container>
          <TitleWrapper>
            <Text fontSize="15px" fontWeight={700} color="#000">
              My Cart
            </Text>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
          </TitleWrapper>
          <CartWrapper>
            <FlexObject>
              <DeliveryImageContainer>
                <DeliveryImage src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/assets/eta-icons/15-mins-filled.png"></DeliveryImage>
              </DeliveryImageContainer>
              <DeliveryInfo>
                <Text
                  fontSize="15px"
                  fontWeight={700}
                  color="#000"
                  padding="0 0 4px 0"
                >
                  Delivery in 9 minutes
                </Text>
                <SubText>Shipment of 2 items</SubText>
              </DeliveryInfo>
            </FlexObject>

            {carts?.map((e: any) => (
              <CartProductCart key={e.id} e={e} />
            ))}
          </CartWrapper>

          <BillWrapper>
            <Text padding="0 0 12px 0">Bill Details</Text>
            <WrapperBillText>
              <BillFlex>
                <SubText>MRP</SubText>
                <SubText>${cartProducts?.getAddToCartsByUserId?.subTotal}</SubText>
              </BillFlex>
            </WrapperBillText>
            <WrapperBillText>
              <BillFlex>
                <SubText>Product discount</SubText>
                <SubText color="#0c831f">
                  -${Math.round(disCountAmount)}
                </SubText>
              </BillFlex>
            </WrapperBillText>
            <WrapperBillText>
              <BillFlex>
                <SubText>Delivery Charge</SubText>
                <SubText>$25</SubText>
              </BillFlex>
            </WrapperBillText>
            <WrapperBillText>
              <SubText color="#0c831f">
                Shop for ₹15 more, to save ₹25 on delivery charge
              </SubText>
            </WrapperBillText>
            <BillFlex style={{ paddingTop: "8px" }}>
              <SubText fontSize="14px" color="#000" fontWeight={500}>
                Grand Total
              </SubText>
              <SubText fontSize="14px" color="#000" fontWeight={500}>
                ${cartProducts?.getAddToCartsByUserId?.subTotal - Math.round(disCountAmount) + 25}
              </SubText>
            </BillFlex>
          </BillWrapper>
          <CouponNote>
            <SubText>Coupons are only applicable on the Blinkit app</SubText>
          </CouponNote>

          <ProductSuggestWrapper>
            <Text padding="0 0 15px 0">Before you checkout</Text>

            <Slider
              className="addToCartSlider"
              {...AddToCartProductSliderSettings}
            >
              {/* {FreshVegetables.products.map((product: any) => (
              <ProductCard key={product.id} e={product} />
            ))} */}
            </Slider>
          </ProductSuggestWrapper>

          <PolicyWrapper>
            <Text padding="0 0 8px 0">Cancellation Policy</Text>
            <SubText fontWeight={500}>
              Orders cannot be cancelled once packed for delivery. In case of
              unexpected delays, a refund will be provided, if applicable.
            </SubText>
          </PolicyWrapper>

          <ProceedWrapper>
            <ProceedButton>
              <BlockDiv>
                <Text fontSize="15px" fontWeight={500} color="#fff">
                  ${cartProducts?.getAddToCartsByUserId?.subTotal - Math.round(disCountAmount) + 25}
                </Text>
                <SubText
                  style={{ opacity: 0.8 }}
                  fontSize="11px"
                  color="#fff"
                  fontWeight={400}
                  padding="4px 0 0 0"
                >
                  TOTAL
                </SubText>
              </BlockDiv>
              <BlockDiv style={{ display: "flex", alignItems: "center" }}>
                <Text fontSize="16px" fontWeight={400} color="#fff">
                  Proceed
                </Text>
                <ChevronRightIcon fontSize="medium" />
              </BlockDiv>
            </ProceedButton>
          </ProceedWrapper>
        </Container>
      </DrawerBox>
    </Suspense>
  );
};

CartDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartDrawer;
