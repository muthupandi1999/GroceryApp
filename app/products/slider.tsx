import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { ProductSliderDatas } from "../utils/data";
import Image from "next/image";
import { SliderImageContainer, SliderWrapper } from "../assets/style";

export default function SimpleSlider({ setImage, image }) {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipe: false,

  };
  return (
    <SliderWrapper>
      <Slider {...settings}>
        {ProductSliderDatas.map((data, index) => (
          <SliderImageContainer key={index} $imageUrl ={image} $url={data.url} onClick={() => setImage(data.url)} >

            <img src={data.url} alt="tyy" />
          
          </SliderImageContainer>

        ))}
      </Slider>
    </SliderWrapper>
  );
}
