"use client";

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  Suspense,
} from "react";

import { globalContext } from "@/app/utils/states";
import {
  CategoryContentContainer,
  CustomSelectField,
  DropDownListItem,
  CategoryGridContainer,
} from "@/app/assets/style";
import ProductCard from "../../../../components/cards/ProductCard";
import { SortOptions } from "@/app/utils/data";
import { FaCheckCircle } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import outFocus from "@/app/hooks/useOutFocus";
import CategorySidebarComponents from "@/app/components/parts/CategorySidebarComponents";
import { ProductTypes } from "@/app/assets/style/interface";
import { GetProductTypeProducts } from "../../../../service/query";
import { useLazyQuery, useQuery, useSuspenseQuery } from "@apollo/client";
import PageLoader from "@/app/components/loader/pageLoader";
import { productTypeProductsByCategoryId } from "@/app/service/api";

function DynamicPage({ params }: Readonly<{ params: any }>) {
  const [selectedSortOption, setSelectSortOption] = useState("Revelance");
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const { categoryListArr } = useContext(globalContext) as any;

  // const [categoryTypeAndProducts, setCategoryTypeAndProducts] = useState(
  //   []
  // ) as any;



  const { categoryTypeAndProductsList, refetchProducts, productTypeLoading } =
    productTypeProductsByCategoryId(params?.subListId, selectedSortOption);

  let categoryTypeAndProducts = categoryTypeAndProductsList?.getProductTypeId;
  console.log("ideeeeeee", categoryTypeAndProducts);
  // const { data: categoryTypeAndProductsList, loading: productTypeLoading, refetch: refetchProducts } =
  //   useQuery(GetProductTypeProducts, {
  //     variables: {
  //       getProductTypeId: params?.subListId,
  //       filter: selectedSortOption,
  //     },
  //     skip: !selectedSortOption, // Skip initial query if selectedSortOption is not set
  //   });

  // const categoryTypeAndProducts = categoryTypeAndProductsList?.getProductType

  useEffect(() => {
    if (selectedSortOption) {
      refetchProducts({
        getProductTypeId: params?.subListId,
        filter: selectedSortOption,
      });
    }
  }, [selectedSortOption]);

  if (productTypeLoading) {
    console.log("Varukiren")
    return <PageLoader />;
  }
  return (
    <>
      <CategorySidebarComponents />
      {!productTypeLoading && categoryTypeAndProducts?.products &&  (
        <CategoryContentContainer>
          <>
            <div className="content-header">
              <h1> Buy {categoryTypeAndProducts?.name} online </h1>

              <div className="sort">
                <span>Sort By</span>
                <div className="dropDown" ref={dropdownRef}>
                  <CustomSelectField onClick={() => setDropDown(!dropDown)}>
                    {selectedSortOption}
                    <span>
                      <IoChevronDownSharp />
                    </span>
                  </CustomSelectField>
                  {dropDown && (
                    <div className="select-options">
                      {SortOptions.map((data, i) => (
                        <DropDownListItem
                          $colorState={data === selectedSortOption}
                          $id={SortOptions.length - 2 < i}
                          $dropdownState={dropDown}
                          onClick={() => {
                            setSelectSortOption(data);
                            setDropDown(false);
                          }}
                          key={i}
                        >
                          <span style={{}}>
                            {selectedSortOption === data ? (
                              <FaCheckCircle style={{ color: "green" }} />
                            ) : (
                              <MdOutlineRadioButtonUnchecked
                                style={{ color: "gray" }}
                              />
                            )}
                          </span>

                          {data}
                        </DropDownListItem>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {categoryTypeAndProducts?.products?.length > 0 ? (
              <CategoryGridContainer>
                {categoryTypeAndProducts?.products?.map((data: any) => (
                  <ProductCard
                    productTypeId={params?.subListId}
                    key={data.id}
                    width="100%"
                    data={data}
                    selectedSortOption={selectedSortOption}
                    categoryId={""}
                  />
                ))}
              </CategoryGridContainer>
            ) : (
              <h3 className="NodataFoundText">No data found</h3>
            )}
          </>
        </CategoryContentContainer>
      )}
    </>
  );
}

export default DynamicPage;
