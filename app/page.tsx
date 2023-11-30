"use client";

import DynamicButton from "./components/buttons/DynamicButton";
import CampaignCard from "./components/cards/CampaignCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CampaignSliderSettings, JSONServerData } from "./utils/data";

import {
  Wrapper,
  Banner,
  BannerInfo,
  BannerText,
  BannerSubText,
  CategoryImageContainer,
} from "./assets/style";
import CategoryProductSlider from "./components/sliders/CategoryProductSlider";
import { useRouter } from "next/navigation";
import TodayLowPriceProducts from "./components/todayLowPriceProducts";
import {
  AllProductTypeBanner,
  getAllCategories,
  getAllCategoryProducts,
} from "./service/query";
import { useEffect, useState } from "react";
import { globalContext } from "./utils/states";
import { useQuery } from "@apollo/client";
import PageLoader from "./components/loader/pageLoader";
export default function Home() {
  const router = useRouter();

  const {
    loading: AllCategoriesLoading,
    error,
    data: allCategories,
  } = useQuery(getAllCategories);

  // const { data: AllCategoryProducts } = useQuery(getAllCategoryProducts) as any;
  const { data: AllBanner, loading: AllProductTypeBannerLoading } = useQuery(
    AllProductTypeBanner
  ) as any;

  if (AllCategoriesLoading && AllProductTypeBannerLoading)
    return <PageLoader />;
  return (
    <Wrapper>
      <Banner>
        <BannerInfo>
          <BannerText>Don't miss out on tasty Grocery Deals</BannerText>
          <BannerSubText>
            Your Favourite grocery shop is now online
          </BannerSubText>
          <DynamicButton name="Shop Now" />
        </BannerInfo>
      </Banner>
      <CategoryProductSlider settings={CampaignSliderSettings}>
        {AllBanner?.getAllBanner?.map((e: any) => (
          <CampaignCard key={e.id} e={e} />
        ))}
      </CategoryProductSlider>

      <CategoryImageContainer>
        {allCategories?.getAllCategories?.map((data: any) => (
          <div
            className="categoryCartBox"
            key={data.id}
            onClick={() => router.push(data?.defaultRoute)}
          >
            <div className="img-container">
              <img src={data?.image} />
            </div>
            <p style={{ padding: "10px 0", fontSize: "13px" }}>{data?.name}</p>
          </div>
        ))}
      </CategoryImageContainer>
      <TodayLowPriceProducts id={"65549be6b8cc555881cb43f3"} />
      <TodayLowPriceProducts id={"6555c9459ad354780c2e6c4c"} />
    </Wrapper>
  );
}
