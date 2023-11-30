// import React, { useState } from "react";
// // import product from "../../assets/img/prod2.avif"
// // import DeliverTime from "./DeliverTime";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   CardContainer,
//   ListTitle,
//   OutOfStock,
//   ProductTimerCard,
// } from "@/app/assets/style";
// import { AddButton } from "@/app/components/buttons/Buttons";
// import OfferTag from "../../products/OfferTag";
// import Modal from "@mui/material/Modal";
// import { Box } from "@mui/material";
// import UnitCard from "./unitCard";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// function ProductCard({ data, slider }: { data: any; slider?: any }) {
//   const router = useRouter();
//   const [count, setCount] = useState(0);
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   // onClick={()=>router.push("/products")}
//   return (
//     <CardContainer
//       style={{
//         opacity: data?.variant?.every(
//           (f: any) => f.ProductInventory?.availableStock === 0
//         )
//           ? 0.5
//           : 1,
//       }}
//       offerState={data?.dicountPercentage}
//       slider={slider}
//       // available={!data?.available}
//     >
//       <div className="img-container">
//         <div className="img-wrapper">
//           <img src={data?.image?.front} alt="" />
//         </div>
//         {/* {!data?.available && <OutOfStock>out of stock</OutOfStock>} */}
//       </div>

//       <div>
//         <ProductTimerCard variant="forCard">
//           <img
//             style={{ width: 11, height: 11 }}
//             src="https://cdn.grofers.com/assets/eta-icons/15-mins.png"
//             alt=""
//           />
//           <span>20 MINS</span>
//         </ProductTimerCard>
//       </div>
//       <div className="title">
//         <ListTitle>
//           {data?.name?.substring(0, 33)} {data?.name?.length > 33 && "..."}{" "}
//         </ListTitle>
//       </div>
//       <div className="quantity">
//         <p>{data?.quantity}</p>
//       </div>
//       {data?.variant.length === 1 && (
//         <p className="unitDiv">{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</p>
//       )}

//       {data?.variant?.every(
//         (f: any) => f.ProductInventory?.availableStock === 0
//       ) && <button className="StockOutBtn">Out Of Stock</button>}

//       {data?.variant.length > 1 && (
//         <>
//           <div onClick={handleOpen} className="productUnit">
//             <p className="unit">{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</p>
//             <ExpandMoreIcon className="unitIcon" fontSize="small" />
//           </div>
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <div className="modelBox">
//               <UnitCard
//                 image={data?.image.front}
//                 productName={data?.name}
//                 variants={data?.variant}
//                 onClose={handleClose}
//               />
//             </div>
//           </Modal>
//         </>
//       )}
//       <div className="cardFooter">
//         {data.dicountPercentage ? (
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <span className="offerPrice">
//               ₹{" "}
//               {Math.ceil(
//                 data?.variant?.[0].price -
//                   (data.dicountPercentage / 100) * data?.variant?.[0].price
//               )}
//             </span>{" "}
//             <span className="price">₹{data?.variant?.[0].price}</span>
//           </div>
//         ) : (
//           <span>₹{data?.variant?.[0].price}</span>
//         )}

//         <AddButton count={count} setCount={setCount} />
//       </div>
//       {data?.dicountPercentage && (
//         <OfferTag discount={data.dicountPercentage} />
//       )}
//     </CardContainer>
//   );
// }

// export default ProductCard;

// import React, { useState } from "react";
// // import product from "../../assets/img/prod2.avif"
// // import DeliverTime from "./DeliverTime";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   CardContainer,
//   ListTitle,
//   OutOfStock,
//   ProductTimerCard,
// } from "@/app/assets/style";
// import { AddButton } from "@/app/components/buttons/Buttons";
// import OfferTag from "../../products/OfferTag";

// function ProductCard({ data, slider }) {
//   const router =useRouter()
//   const [count, setCount] = useState(0);
//   return (
//     <CardContainer onClick={()=>router.push("/products")}
//       offerState={data?.offer}
//       slider={slider}
//       available={!data?.available}
//     >
//       <div className="img-container">
//         <div className="img-wrapper">
//           <img src={data?.productImage} alt="" />
//         </div>
//         {!data?.available && <OutOfStock>out of stock</OutOfStock>}
//       </div>

//       <div>
//         <ProductTimerCard variant="forCard">
//           <img
//             style={{ width: 11, height: 11 }}
//             src="https://cdn.grofers.com/assets/eta-icons/15-mins.png"
//             alt=""
//           />
//           <span>20 MINS</span>
//         </ProductTimerCard>
//       </div>
//       <div className="title">
//         <ListTitle>
//           {data?.productName.substring(0, 33)}{" "}
//           {data?.productName.length > 33 && "..."}{" "}
//         </ListTitle>
//       </div>
//       <div className="quantity">
//         <p>{data?.quantity}</p>
//       </div>
//       <div className="cardFooter">
//         {data.offer ? (
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <span className="offerPrice">
//               ₹ {Math.ceil(data?.price - (data.offer / 100) * data?.price)}
//             </span>{" "}
//             <span className="price">₹{data?.price}</span>
//           </div>
//         ) : (
//           <span>₹{data?.price}</span>
//         )}

//         <AddButton count={count} setCount={setCount} />
//       </div>
//       {data?.offer && <OfferTag discount={data.offer} />}
//     </CardContainer>
//   );
// }

// export default ProductCard;

import React, { useContext, useEffect, useState } from "react";
import { ListTitle, ProductTimerCard } from "@/app/assets/style";
import { AddButton } from "@/app/components/buttons/Buttons";

import { styled } from "styled-components";
import { FlexBox } from "@/app/assets/style/commonStyles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";
import UnitCard from "./unitCard";
import OfferTag from "@/app/products/OfferTag";
import {
  AddToCart,
  GetAddToCarts,
  getAllCategories,
} from "@/app/service/query";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { branchId } from "@/app/utils/data";
import { globalContext } from "@/app/utils/states";
import { fetchCategoryWithProducts } from "@/app/service/api";

interface CardContainer {
  width?: string;
  stock?: string;
}
const ModelBoxstyle = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border: none;
  border-radius: 10px;
  padding: 16px;
  background-color: #f4f6fb;
  outline: none;
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 560px) {
    width: 300px;
  }
`;

let CardContainer = styled.section<CardContainer>`
  width: ${(props: any) => props.width ?? "96%"};
  cursor: pointer;
  background: rgb(255, 255, 255);
  border: 0.5px solid rgb(232, 232, 232);
  box-shadow: rgba(0, 0, 0, 0.04) 2px 2px 8px;
  border-radius: 8px;
  padding-bottom: 0.75rem;
  position: relative;
  @media (max-width: 768px) {
    margin: auto;
  }
  .StockOutBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    color: #fff;
    width: 80px;
    height: 20px;
    font-size: 10px;
    border: none;
    border-radius: 10px;
  }
`;
export let FlexImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

export let UnitDiv = styled.section`
  display: flex;
  align-items: center;
  height: 26px;
  color: #666666;
  font-size: 12px;
  margin-bottom: 24px;
`;

let CardFooder = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .priceBox {
    display: flex;
    flex-direction: column;
  }
`;
let CardDetails = styled.section`
  padding: 0 12px;
  .productUnit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee;
    padding: 7px;
    margin-bottom: 14px;
    border-radius: 4px;
  }
  .unit {
    font-size: 12px;
  }

  .unitIcon {
    color: #785e5e;
  }
`;

let ProductPrice = styled.text`
  color: rgb(31, 31, 31);
  font-weight: 600;
  font-size: 12px;
`;

let ProductCumPrice = styled.text`
  color: rgb(31, 31, 31);
  font-weight: 600;
  font-size: 12px;
  color: #666;
  text-decoration: line-through;
`;

function ProductCard({
  data,
  slider,
  width,
  categoryId,
  productTypeId,
  selectedSortOption,
}: Readonly<{
  data: any;
  slider?: any;
  width?: string;
  categoryId: string;
  productTypeId?: any;
  selectedSortOption?: any;
}>) {
  console.log("heloooooooooooooooooooo", data);
  const [open, setOpen] = React.useState(false);

  const [addToCartProduct, { data: AddToCartData, loading: addLoader, error }] =
    useMutation(AddToCart);
  const { CategoryProductsRefetch } = fetchCategoryWithProducts(categoryId);

  // const { AddToCartsRefetch } = GetAddToCartsApi("655379d96144626a275e8a14");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const { CategoryListArr } = useContext(globalContext);
  const variables = {
    productId: data?.id,
    quantity: 1,
    totalPrice: data?.variant?.[0]?.price,
    userId: "65642fcb264c4f37a0b129be",
    deviceToken: null,
    selectedVariantId: data?.variant?.[0]?.id,
  };
  console.log("dataaa", data);

  let quantity = data?.variant?.[0]?.AddToCart?.quantity;
  console.log("quantittttt", data?.variant?.[0]?.AddToCart?.quantity);
  const addToCart = async () => {
    // console.log("CategoryListArr", CategoryListArr);
    console.log("clicking");

    const addToCartData = await addToCartProduct({
      variables: {
        input: variables,
      },
      refetchQueries: [
        GetAddToCarts, // DocumentNode object parsed with gql
        "getAddToCartsByUserId", // Query name
      ],
    });

    if (addToCartData) {
      // AddToCartsRefetch();
      CategoryProductsRefetch();
    }
  };
  return (
    <CardContainer
      width={width}
      style={{
        opacity: data?.variant?.every(
          (f: any) => f.ProductInventory?.availableStock === 0
        )
          ? 0.5
          : 1,
      }}
    >
      <FlexBox width="140px" height="140px">
        <FlexImage src={data?.image?.image}></FlexImage>
      </FlexBox>
      <CardDetails>
        <div>
          <ProductTimerCard variant="forCard">
            <img
              style={{ width: 11, height: 11 }}
              src="https://cdn.grofers.com/assets/eta-icons/15-mins.png"
              alt=""
            />
            <span>20 MINS</span>
          </ProductTimerCard>
        </div>
        <div className="title">
          <ListTitle fontSize="13px" marginBottom="6px">
            {data?.name}
          </ListTitle>
        </div>

        {data?.variant?.length === 1 && (
          <UnitDiv>{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</UnitDiv>
        )}
        {console.log("e", data?.variant)}
        {data?.variant?.every(
          (f: any) =>
            f.ProductInventory?.filter((e: any) => e.branchId === branchId)
              .availableStock === 0
        ) && <button className="StockOutBtn">Out Of Stock</button>}

        {data?.variant?.length > 1 && (
          <>
            <div onClick={handleOpen} className="productUnit">
              <p className="unit">{`${data?.variant[0]?.values}${data?.variant?.[0].unit}`}</p>
              <ExpandMoreIcon className="unitIcon" fontSize="small" />
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              <ModelBoxstyle>
                <UnitCard
                  image={data?.image?.image}
                  product={data}
                  variants={data?.variant}
                  onClose={handleClose}
                />
              </ModelBoxstyle>
            </Modal>
          </>
        )}

        <CardFooder>
          {data?.dicountPercentage === null && (
            <ProductPrice>${data?.variant?.[0]?.price}</ProductPrice>
          )}
          {data?.dicountPercentage && (
            <div className="priceBox">
              <ProductPrice>
                $
                {Math.round(
                  data?.variant?.[0].price -
                    data?.variant?.[0].price * (data?.dicountPercentage / 100)
                )}
              </ProductPrice>
              <ProductCumPrice>${data?.variant?.[0].price}</ProductCumPrice>
            </div>
          )}

          <AddButton
            variables={variables}
            onClick={() => addToCart()}
            quantity={quantity}
            disable={addLoader}
            categoryId={categoryId}
            subListId={productTypeId}
            selectedSortOption={selectedSortOption}
            // refetchFun={undefined}
          />
        </CardFooder>
        {console.log("percentage", data?.discountPercentage)}
        {data?.dicountPercentage && (
          <OfferTag discount={data?.dicountPercentage} />
        )}
      </CardDetails>
    </CardContainer>
  );
}

export default ProductCard;
