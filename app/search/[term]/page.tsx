"use client";
// import React, { useEffect, useState } from "react";
// import { AllProductsWithSearch } from "@/app/service/query";
// import {
//   CategoryContentContainer,
//   CategoryGridContainer,
// } from "@/app/assets/style";
// import ProductCard from "@/app/components/cards/ProductCard";
// import { NofoundText } from "../page";
// import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

// function page({params}:{params:any}) {

//   const [products, setProducts] = useState<any>([]);
//   const { data: AllProducts }: any = useQuery(AllProductsWithSearch, {
//     variables: {
//       filter: params?.term,
//     },
//   });

//   console.log("CategoryProductsList", AllProducts)

//   useEffect(() => {
//     setProducts(AllProducts?.getAllProducts
//       );
//   }, [AllProducts]);

//   return (
//     <div>
//       {products?.length > 0 ? (
//         <CategoryContentContainer>
//           <div className="content-header">
//             <h1> Search results for "{params?.term}" </h1>
//           </div>

//           <CategoryGridContainer>
//             {products?.map((data: any) => (
//               <ProductCard width="100%" key={data.id} data={data} />
//             ))}
//           </CategoryGridContainer>
//         </CategoryContentContainer>
//       ) : (
//         <NofoundText> No data found</NofoundText>
//       )}
//     </div>
//   );
// }

// export default page;

import React from "react";
import SearchProduct from "./searchProduct";


function page({params}:any) {
  return (
    <div>
      <SearchProduct params={params} />
    </div>
  );
}

export default page;
