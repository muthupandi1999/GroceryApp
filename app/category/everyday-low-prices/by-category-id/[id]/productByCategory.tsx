"use client";
import {
  CategoryContentContainer,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "../../../../components/cards/ProductCard";
import React, { useEffect, useState } from "react";
import PageLoader from "@/app/components/loader/pageLoader";
import { fetchCategoryWithProducts } from "@/app/service/api";

function ProductByCategory({ params }: Readonly<{ params: any }>) {
  const [categoryProducts, setCategoryProducts] = useState<any>([]);
 console.log("paramssss", params?.id)
  const { CategoryProductsSlider,CategoryProductsRefetch, CategoryProductsLoading } =
    fetchCategoryWithProducts(params?.id);

  useEffect(() => {
    console.log("hlooooooooooooooo", CategoryProductsSlider)
    CategoryProductsRefetch()
    setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
  }, [CategoryProductsSlider]);

  if (CategoryProductsLoading) return <PageLoader />;
  return (
    <>
      {categoryProducts ? (
        <CategoryContentContainer>
          <div className="content-header">
            <h1> {categoryProducts.name} </h1>
          </div>

          <CategoryGridContainer>
            {categoryProducts?.products?.map((data: any) => (
              <ProductCard
                categoryId={params.id}
                width="100%"
                key={categoryProducts.id}
                data={data}
              />
            ))}
          </CategoryGridContainer>
        </CategoryContentContainer>
      ) : (
        <h1> No data found...</h1>
      )}
    </>
  );
}

export default ProductByCategory;
