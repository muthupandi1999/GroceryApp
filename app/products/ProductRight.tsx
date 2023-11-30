import React, { useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";

import { companyBenefits } from "../utils/data";
import { AddButton } from "../components/buttons/Buttons";
import Image from "next/image";
import {
  ProductRightSection,
  ProductTimerCard,
  TitleTag,
} from "../assets/style";
function ProductRight() {
  const [counter, setCounter] = useState(0);

  return (
    <ProductRightSection>
      <div className="productInfo">
        <a href="">BreadCrumbs</a>
        <TitleTag variant="productTitle">milky mist paneer</TitleTag>

        <ProductTimerCard variant="">
          <img
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/28169a.jpg?ts=1678192659"
            alt=""
          />
          <span>20 MINS</span>
        </ProductTimerCard>
        <div className="viewCategory">
          <a href="">
            View all by Category
            <BiSolidRightArrow className="right-arrow" />
          </a>
        </div>
        <div className="product-info-details">
          <div>
            <p className="quantity">200g</p>
            <p className="price">
              MRP <span>₹125</span>{" "}
            </p>
          </div>
          <div>
            <AddButton $count={counter} setCount={setCounter} />
          </div>
        </div>
      </div>
      <div className="benefits">
        <h4 style={{}}>Why shop from blinkit?</h4>
        <div className="benefitlistContainer">
          {companyBenefits.map((data, index) => (
            <div key={index} className="list-wrapper">
              <div className="icon">
                <img src={data?.iconSrc} alt="" />
              </div>
              <div className="content">
                <p>{data.benifitName}</p>
                <span>{data.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProductRightSection>
  );
}

export default ProductRight;
