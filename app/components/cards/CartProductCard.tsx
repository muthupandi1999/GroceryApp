import React, { useState } from "react";
import styled from "styled-components";
import { Text, SubText, BlockDiv } from "../AddToCart";
import { AddButton } from "@/app/components/buttons/Buttons";
import { UnitDiv } from "./ProductCard";
import {
  ProductWrapper,
  ProductImageContainer,
  ProductImage,
  ProductInfoDetails,
} from "@/app/assets/style";

function CartProductCart({ e }: Readonly<{ e: any }>) {
  console.log("carts", e);
  const [count, setCount] = useState(e.quantity);
  return (
    <ProductWrapper>
      <ProductImageContainer>
        <ProductImage src={e?.product?.image?.image}></ProductImage>
      </ProductImageContainer>
      <ProductInfoDetails>
        <SubText padding="0 0 4px 0" style={{ width: "90%" }}>
          {e?.product?.name}
        </SubText>
        <UnitDiv
          style={{ margin: "0px" }}
        >{`${e?.selectedVariant?.values}${e?.selectedVariant?.unit}`}</UnitDiv>
        <Text style={{ fontSize: "12px" }}>${e?.selectedVariant?.price}</Text>
      </ProductInfoDetails>
      <AddButton variables={e} quantity={e?.quantity} onClick={undefined} disable={undefined} categoryId={undefined} subListId={undefined} selectedSortOption={undefined} />
    </ProductWrapper>
  );
}

export default CartProductCart;
