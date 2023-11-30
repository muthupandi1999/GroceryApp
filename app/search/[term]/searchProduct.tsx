"use client";
import React, { useEffect, useState } from "react";
import { AllProductsWithSearch } from "@/app/service/query";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "@/app/components/cards/ProductCard";
import { NofoundText } from "../page";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useLazyQuery } from "@apollo/client";
import PageLoader from "@/app/components/loader/pageLoader";

function SearchProduct({ params }: Readonly<{ params: any }>) {
  const [products, setProducts] = useState<any>([]);

  const [loadGreeting, { loading: SearchProductLoading }] = useLazyQuery(
    AllProductsWithSearch,
    {
      variables: {
        filter: params?.term,
      },
    }
  );

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await loadGreeting();
      setProducts(data?.getAllProducts);
    };
    getAllProducts();
  }, []);

  if (SearchProductLoading) return <PageLoader />;

  return (
    <div>
      {products ? (
        <CategoryContentContainer>
          <div className="content-header">
            <h1> Search results for "{params?.term}" </h1>
          </div>

          <CategoryGridContainer>
            {products?.map((data: any) => (
              <ProductCard width="100%" key={data.id} data={data} />
            ))}
          </CategoryGridContainer>
        </CategoryContentContainer>
      ) : (
        <NofoundText> No data found</NofoundText>
      )}
    </div>
  );
}

export default SearchProduct;
