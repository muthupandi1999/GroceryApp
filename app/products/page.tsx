"use client";
import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import SimpleSlider from "./slider";
import ProductDetails from "./ProductDetails";
// import prod1 from "../assets/img/front.avif";

import ProductCard from "../components/cards/ProductCard";
import { ProductContainer, ProductLeftSection } from "../assets/style";
import ProductRight from "./ProductRight";

function Products() {
  const [image, setImage] = useState(
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/images/products/full_screen/pro_28169.jpg?ts=1684833423"
  );

  return (
    <ProductContainer>
      <ProductLeftSection>
        <div className="productViewer">
          <div className="perimeter">
            <div className="image">
              <ReactImageMagnify
                enlargedImageContainerStyle={{
                  left: "130%",
                  top: "8%",
                  zIndex: 20,
                  borderColor: "#f2f2f2",
                }}
                {...{
                  smallImage: {
                    src: image,
                    width: 480,
                    height: 480,
                  },
                  largeImage: {
                    src: image,
                    width: 1426,
                    height: 2000,
                  },
                  enlargedImageContainerDimensions: {
                    width: "180%",
                    height: "180%",
                  },

                  isHintEnabled: true,
                }}
              />
            </div>
          </div>
          <SimpleSlider setImage={setImage} image={image} />
        </div>
        <ProductDetails />
      </ProductLeftSection>
      <ProductRight />
    </ProductContainer>
  );
}
export default Products;
