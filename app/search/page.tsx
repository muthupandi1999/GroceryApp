"use client";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AllProductsWithSearch } from "@/app/service/query";

import ProductCard from "@/app/components/cards/ProductCard";

import { useLazyQuery, useQuery } from "@apollo/client";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "../assets/style";
import PageLoader from "../components/loader/pageLoader";
export const NofoundText = styled.text`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
`;

function page() {
  const [allProducts, setAllProducts] = useState([]) as any;

  const [loadGreeting, {loading:AllProductsLoading}] = useLazyQuery(AllProductsWithSearch, {
    variables: {
      filter: "",
    },
  });

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await loadGreeting();
      setAllProducts(data?.getAllProducts);
    };
    getAllProducts();
  }, []);

  if (AllProductsLoading) return <PageLoader />;
  return (
    <div>
      {allProducts ? (
        <CategoryContentContainer>
          <div className="content-header">
            <h1> All Products </h1>
          </div>

          <CategoryGridContainer>
            {allProducts?.map((data: any) => (
              <ProductCard width="100%" key={data.id} data={data} categoryId={""} />
            ))}
          </CategoryGridContainer>
        </CategoryContentContainer>
      ) : (
        <NofoundText> No data found</NofoundText>
      )}
    </div>
  );
}

export default page;
