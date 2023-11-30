import {
  FooterContainer,
  LinksTitleTag,
  Rights,
  StyledLink,
} from "@/app/assets/style";
import { JSONServerData } from "@/app/utils/data";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useQuery } from "@apollo/client";
import { getAllCategories } from "@/app/service/query";
import { CategoryI } from "@/app/assets/style/interface";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

const FooterComponent = () => {
  const router = useRouter();
  const { loading, error, data: allCategories } = useQuery(getAllCategories);
  return (
    <>
      <FooterContainer container>
        <Grid sm={12} xl={3.8}>
          <LinksTitleTag>Useful Links</LinksTitleTag>
          <Grid container>
            {JSONServerData.useFullLinks.map((data: string, i: number) => (
              <Grid key={i} xs={12} md={4}>
                <Link href={"/"}>
                  <StyledLink>{data}</StyledLink>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xl={8.2}>
          <LinksTitleTag>
            Categories
            <Link href={"/category"}>
              <span>see all</span>
            </Link>
          </LinksTitleTag>
          <Grid sx={{ margin: "0px !important" }} container my={2}>
            {allCategories?.getAllCategories?.map((data: CategoryI, i: any) => (
              <Grid key={i} xs={12} md={4}>
                <Link key={data.id} href={data?.defaultRoute}>
                  <StyledLink>{data.name}</StyledLink>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </FooterContainer>
      <Rights>
        <p>© QuickBasketHub</p>
        <p>
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
        </p>
      </Rights>
    </>
  );
};

export default FooterComponent;
