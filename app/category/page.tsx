"use client"
import Link from "next/link";
import { LinksTitleTag, StyledLink, TitleTag } from "../assets/style";
import { JSONServerData } from "../utils/data";
import { Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getAllCategories } from "../service/query";

function page() {
  const { loading, error, data: allCategories } = useQuery(getAllCategories);
  return (
    <>
      <TitleTag variant="detailsTitle">categories</TitleTag>
      {allCategories?.getAllCategories?.map(
        (data:any) => {
          return (
            <>
              <LinksTitleTag>{data?.name}</LinksTitleTag>
              <Grid container>
                {data?.productTypes.map((value:any) => (
                  <Grid key={value.id} sm={6}>
                    <Link
                      href={value?.defaultRoute}
                    >
                      <StyledLink variant="categoryLink">
                        {value?.name}
                      </StyledLink>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>
          );
        }
      )}
    </>
  );
}

export default page;
