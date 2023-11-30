"use client";
import {
  CategorySidebarContainer,
  SideBarListContainer,
} from "@/app/assets/style";
import { useQuery } from "@apollo/client";
import { Divider } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CategoryProductTypeList } from "../../service/query";
import { ProductTypesI } from "@/app/assets/style/interface";


function CategorySidebarComponents() {
  const path = usePathname();
  const pathArr = path.split("/");
  const Router = useRouter();

  console.log("pathArr", pathArr);

  const { data: categoryProductTypes } = useQuery(CategoryProductTypeList, {
    variables: {
      getCategoryId: pathArr[3],
    },
  });
  let productTypesData = categoryProductTypes?.getCategory;
  return (
    <CategorySidebarContainer>
      {productTypesData?.productTypes.map((data: ProductTypesI) => (
        <>
          <a
            onClick={() =>
              Router.push(
                `/category/${pathArr[pathArr.length - 3]
                  .split(" ")
                  .join("-")}/${pathArr[pathArr.length - 2]}/${data.id}`
              )
            }
          >
            <SideBarListContainer
              routeId={data.id === pathArr[pathArr.length - 1]}
            >
              <div className="img-container">
                <img
                  style={{ width: "100%", position: "relative" }}
                  src={`${data.image}`}
                  alt=""
                />
              </div>
              <div className="subtitle">{data.name}</div>
            </SideBarListContainer>
          </a>
          <Divider light />
        </>
      ))}
    </CategorySidebarContainer>
  );
}

export default CategorySidebarComponents;
