import React from "react";
import { ProductDetailsList } from "../utils/data";
import { DetailsContainer, ListTitle, TitleTag } from "../assets/style";

function ProductDetails() {
  return (
    <DetailsContainer >
      <TitleTag variant="detailsTitle" >product details </TitleTag>
      {ProductDetailsList.map((data, index) => (
        <div className="list-container" key={index} >
          <ListTitle >{data.detailName}</ListTitle>
          <p>{data.description}</p>
        </div>
      ))}
    </DetailsContainer>
  );
}

export default ProductDetails;
