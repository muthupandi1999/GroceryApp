"use client";
import {
  CategoryHiddenListPopper,
  CategoryNavContainer,
  DropDownListItem,
  HiddlenNavList,
  NavListItem,
} from "@/app/assets/style";
import outFocus from "@/app/hooks/useOutFocus";
import { getAllCategories } from "../../service/query";
import { JSONServerData } from "@/app/utils/data";
import { globalContext } from "@/app/utils/states";
import { useQuery } from "@apollo/client";
import { Button, Divider, Popover, Popper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { CategoryI } from "@/app/assets/style/interface";

function CategoryNavComponent() {
  const Router = useRouter();
  const { loading, error, data: allCategories } = useQuery(getAllCategories);
  const [hiddenNav, setHiddenNav] = useState(false);
  const [anchorEL, setAnchorEL] = useState<HTMLAnchorElement | null>(null);
  const hiddenRef = useRef(null);
  const [sliceCount, setSliceCount] = useState(7);
  const showonList = allCategories?.getAllCategories?.slice(0, sliceCount);
  const hiddenList = allCategories?.getAllCategories?.slice(
    sliceCount,
    allCategories?.getAllCategories?.length
  );

  console.log("showonOnlIst", showonList);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1170) {
        setSliceCount(4);
      } else {
        setSliceCount(7);
      }
    });
    return () =>
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 1170) {
          setSliceCount(4);
        } else {
          setSliceCount(7);
        }
      });
  }, []);

  const open = Boolean(anchorEL);

  const id = open ? "simple-popover" : undefined;
  return (
    <CategoryNavContainer>
      <nav className="navList">
        {showonList?.map((data: CategoryI) => (
          <NavListItem
            onClick={() => {
              Router.push(data?.defaultRoute);
            }}
            key={data?.id}
          >
            {data.name}
          </NavListItem>
        ))}

        <NavListItem
          style={{ position: "relative" }}
          aria-describedby={id}
          ref={hiddenRef}
          // onClick={(event) => {
          //   setAnchorEL(event.currentTarget);
          // }}
          onClick={() => setHiddenNav(!hiddenNav)}
        >
          more{" "}
          <span>
            <IoChevronDownSharp />
          </span>
          {hiddenNav && (
            <HiddlenNavList id={id}>
              <div className="hiddenList">
                {hiddenList?.map((data: any) => (
                  <>
                    <NavListItem
                      onClick={() => {
                        Router.push(data?.defaultRoute);
                      }}
                      key={data?.id}
                    >
                      {data.name}
                    </NavListItem>
                    <Divider light />
                  </>
                ))}
              </div>
            </HiddlenNavList>
          )}
        </NavListItem>

        {/* <CategoryHiddenListPopper
          id={id}
          open={open}
          anchorEl={anchorEL}
          onClose={() => setAnchorEL(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="hiddenList">
            {hiddenList?.map((data: any) => (
              <>
                <NavListItem
                  onClick={() => {
                    Router.push(data?.defaultRoute);
                  }}
                  key={data?.id}
                >
                  {data.name}
                </NavListItem>
                <Divider light />
              </>
            ))}
          </div>
        </CategoryHiddenListPopper> */}
      </nav>
    </CategoryNavContainer>
  );
}

export default CategoryNavComponent;
