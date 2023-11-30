// 'use client'
// import {
//   Button,
//   HeaderContainer,
//   HeaderRightSec,
//   HeaderRow,
//   ImgTag,
//   LocationSec,
//   LogoSec,
//   SearchBox,
//   SearchSec,
// } from "../../assets/style";
// //Images
// import logo from "../../assets/img/logo.png"
// import { ExpandMore, Login, Search, ShoppingCart } from "@mui/icons-material";

// const HeaderComponent = () => {
//   return (
//     <>
//       <HeaderContainer>
//         <HeaderRow>
//           <LogoSec>
//             <ImgTag $imgfit="contain" src={logo} alt='logo' />
//           </LogoSec>

//           <LocationSec>
//             <h4 className="title">Delivery in 17 minutes</h4>
//             <div className="contentSec">
//                 <p className="content">36P6+65H, 1st Main St, Y Block, Anna Nagar, Chennai, Tamil Nadu 600040, India</p>
//                 <ExpandMore />
//             </div>
//           </LocationSec>

//           <SearchSec>
//             <SearchBox>
//                 <input type="text" placeholder="Search for atta dal and more" />
//                 <Search className="searchIcon" />
//             </SearchBox>
//           </SearchSec>

//           <HeaderRightSec>
//             <button className="buttonLink"><Login/>Login</button>
//             <Button $icon="left">
//               <ShoppingCart />
//               <span>
//                 1 item My Cart
//               </span>
//             </Button>
//           </HeaderRightSec>
//         </HeaderRow>
//       </HeaderContainer>
//     </>
//   );
// };

// export default HeaderComponent;

"use client";
import {
  Button,
  HeaderContainer,
  HeaderRightSec,
  HeaderRow,
  ImgTag,
  LocationSec,
  LocationWrapper,
  LogoSec,
  SearchBox,
  SearchSec,
} from "../../assets/style";
//Images
import logo from "../../assets/img/logo.png";
import { ExpandMore, Login, Search, ShoppingCart } from "@mui/icons-material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Drawer, Modal, Typography } from "@mui/material";
import CartDrawer from "../AddToCart";
import { IoMdContact } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { globalContext } from "@/app/utils/states";
import React from "react";
import styled from "styled-components";
import LoginCard from "../models/login";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddressModel from "../models/addressModel";
const HeaderComponent = () => {
  const [open, setOpen] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openAddress, setOpenAddress] = React.useState(false);
  const handleOpenAddress = () => setOpenAddress(true);
  const handleCloseAddress = () => setOpenAddress(false);

  const router = useRouter();
  useEffect(() => {
    if (startSearch) {
      router.push(`/search/${search}`);
    }
  }, [search]);
  const path = usePathname();
  const pathArr = path.split("/");
  // useEffect(() => {
  //   if (defaultRoutes.length === 0) {
  //     setSearch("");
  //   }
  // }, [defaultRoutes]);
  const LoginModelBoxstyle = styled.section`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    border: none !important;
    border-radius: 10px;
    padding: 16px;
    background-color: #f4f6fb;
    @media only screen and (max-width: 560px) {
      width: 300px;
    }
  `;

  const AddressModelBoxstyle = styled.section`
    position: absolute;
    top: 28%;
    right: 6%;
    transform: translate(-50%, -50%);
    width: 276px;
    border: none !important;
    border-radius: 10px;
    padding: 16px;
    background-color: #f4f6fb;
    &:focus {
      outline: none;
    }
    @media only screen and (max-width: 560px) {
      width: 300px;
    }
  `;
  return (
    <HeaderContainer>
      <HeaderRow>
        <LogoSec>
          <Link href={"/"}>
            <ImgTag $imgfit="contain" src={logo} alt="logo" />
          </Link>
        </LogoSec>
        {!pathArr?.includes("search") && (
          <LocationWrapper>
            <LocationSec>
              <h4 className="title">Delivery in 17 minutes</h4>
              <div className="contentSec">
                <p className="content">
                  36P6+65H, 1st Main St, Y Block, Anna Nagar, Chennai, Tamil
                  Nadu 600040, India
                </p>
                <ExpandMore />
              </div>
            </LocationSec>
            <div className="login">
              <IoMdContact size={32} color={"black"} />
            </div>
          </LocationWrapper>
        )}

        <SearchSec>
          <SearchBox>
            <input
              onFocus={() => setStartSearch(true)}
              onBlur={() => setStartSearch(false)}
              onClick={(e: any) => {
                if (e.target.value.length === 0) {
                  router.push("/search");
                }
              }}
              type="text"
              placeholder="Search for atta dal and more"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Search className="searchIcon" />
          </SearchBox>
        </SearchSec>

        <HeaderRightSec>
          {JSON.parse(localStorage.getItem("Credentials") as any) ? (
            <div className="AddressBox">
              <h5 className="Accounts" onClick={handleOpenAddress}>
                Account <ArrowDropDownIcon />
              </h5>
              <Modal
                open={openAddress}
                onClose={handleCloseAddress}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="AddressModel"
              >
                <AddressModelBoxstyle>
                  <AddressModel onClose={handleCloseAddress} />
                </AddressModelBoxstyle>
              </Modal>
            </div>
          ) : (
            !pathArr.includes("search") && (
              <>
                <button onClick={handleOpenLogin} className="buttonLink">
                  <Login />
                  Login
                </button>
                <Modal
                  open={openLogin}
                  onClose={handleCloseLogin}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <LoginModelBoxstyle>
                    <LoginCard onClose={handleCloseLogin} />
                  </LoginModelBoxstyle>
                </Modal>
              </>
            )
          )}

          <Button $icon="left" onClick={handleOpen}>
            <ShoppingCart />
            <span>1 item My Cart</span>
          </Button>
          <Drawer
            sx={{
              background: "1f1f1f",
              "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
                backgroundColor: "#f5f7fc",
              },
            }}
            anchor="right"
            open={open}
            onClose={handleClose}
          >
            <CartDrawer open={open} anchor="right" onClose={handleClose} />
          </Drawer>
        </HeaderRightSec>
      </HeaderRow>
    </HeaderContainer>
  );
};

export default HeaderComponent;
