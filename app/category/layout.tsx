"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import CategoryNavComponent from "../components/parts/CategoryNavComponent";
import CategorySidebarComponents from "../components/parts/CategorySidebarComponents";
import { CategoryContainer } from "../assets/style";
import { CategoryList } from "../utils/data";
import {
  categoryListArr,
  globalContext,
  setCategoryListArr,
} from "../utils/states";
import { useQuery } from "@apollo/client";
import { getAllCategories } from "../service/query";

function layout({ children }) {
  const { defaultRoutes,categoryListArr,setCategoryListArr } = useContext(globalContext);
 

  const { data } = useQuery(getAllCategories);
  useEffect(()=>{
  
    if(data){
        setCategoryListArr(data.getAllCategories)
    }

  },[data])

  return (
    <>
      {defaultRoutes !== "category" ? (
        <>
          <CategoryNavComponent />
          <CategoryContainer>{children}</CategoryContainer>{" "}
        </>
      ) : (
        <> {children}</>
      )}
    </>
  );
}

export default layout;
