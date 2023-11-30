// "use client";
// import {
//   CategoryContentContainer,
//   CategoryGridContainer,
// } from "@/app/assets/style";
// import ProductCard from "../../../../components/cards/ProductCard";
// import React, { useEffect, useState } from "react";
// import { GetCategoryProducts } from "@/app/service/query";
// import { useLazyQuery, useQuery } from "@apollo/client";
// import PageLoader from "@/app/components/loader/pageLoader";
// import { fetchCategoryWithProducts } from "@/app/service/api";

// function productByCategory({
//   params,
//   characters,
// }: {
//   params: any;
//   characters: any;
// }) {
//   console.log("charcccc", characters);

//   const [categoryProducts, setCategoryProducts] = useState([]) as any;

//   const { CategoryProductsSlider, CategoryProductsLoading } = fetchCategoryWithProducts(params.id);
//   console.log("CategoryProductsSlider", CategoryProductsSlider)
//   console.log("Varuthaaaaaaaaaaaaaa", categoryProducts)
//   useEffect(() => {

//     setCategoryProducts(CategoryProductsSlider?.getCategoryWithProductTypes);
//     console.log("Varuthaaaaaaaaaaaaaa", categoryProducts)
//   }, [CategoryProductsSlider]);

//   // const [loadGreeting, { refetch, loading: ProductByCategoryLoading }] =
//   //   useLazyQuery(GetCategoryProducts, {
//   //     variables: {
//   //       getCategoryWithProductTypesId: params.id,
//   //     },
//   //   });

//   // useEffect(() => {
//   //   const getCarts = async () => {
//   //     const { data } = await loadGreeting();
//   //     setCategoryProducts(data?.getCategoryWithProductTypes);
//   //   };
//   //   getCarts();
//   // }, []);

//   if (CategoryProductsLoading) return <PageLoader />;
//   return (
//     <>
//       {categoryProducts ? (
//         <CategoryContentContainer>
//           <div className="content-header">
//             <h1> {categoryProducts.name} </h1>
//           </div>

//           <CategoryGridContainer>
//             {categoryProducts?.products?.map((data: any) => (
//               <ProductCard
//                 categoryId={params.id}
//                 width="100%"
//                 key={categoryProducts.id}
//                 data={data}
//               />
//             ))}
//           </CategoryGridContainer>
//         </CategoryContentContainer>
//       ) : (
//         <h1> No data found...</h1>
//       )}
//     </>
//   );
// }

// export default productByCategory;
import React from "react";
import ProductByCategory from "./productByCategory";

function page({params}:{params:any}) {
  return <ProductByCategory params={params}  />;
}

export default page;
