import React, { useEffect, useState } from "react";
import { Container, FlexBox } from "../assets/style/commonStyles";
import ProductCard from "./cards/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeProductSliderSettings } from "../utils/data";
import { useRouter } from "next/navigation";
import CategoryProductSlider from "./sliders/CategoryProductSlider";
import { SeeAllText, TitleTag } from "../assets/style";
import { GetCategoryProducts } from "../service/query";
import { useLazyQuery } from "@apollo/client";
import { fetchCategoryWithProducts } from "../service/api";
function TodayLowPriceProducts({ id }: Readonly<{ id: string }>) {
  const [sliderData, setSliderData] = useState([]) as any;
  const { CategoryProductsSlider, CategoryProductsRefetch } =
    fetchCategoryWithProducts(id);
  useEffect(() => {
    CategoryProductsRefetch()
    setSliderData(CategoryProductsSlider?.getCategoryWithProductTypes);
  }, [CategoryProductsSlider]);

  console.log("sliderrr", sliderData);
  const router = useRouter();

  return (
    <Container>
      {sliderData?.products ? (
        <>
          <FlexBox>
            <TitleTag variant="productTitle">{sliderData?.name}</TitleTag>

            <SeeAllText
              onClick={() =>
                router.push(
                  `/category/everyday-low-prices/by-category-id/${sliderData?.id}`
                )
              }
            >
              See all
            </SeeAllText>
          </FlexBox>

          <CategoryProductSlider settings={HomeProductSliderSettings}>
            {sliderData?.products?.slice(0, 15).map((product: any) => (
              <ProductCard key={product.id} data={product} slider={true} />
            ))}
          </CategoryProductSlider>
        </>
      ) : (
        <h4>loading</h4>
      )}
    </Container>
  );
}

export default TodayLowPriceProducts;
