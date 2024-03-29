import { GetStaticProps } from "next";
import React from "react";
import MainLayout from "../../../components/MainLayout";
import { getAllLocations } from "../../../services/apiService";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Location from "../../../models/Location";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StickyHeader from "../../../components/StickyHeader";
import CardItem from "../../../components/CardItem";
interface Props {
  locations: Location[];
  page: number;
  totalPages: number;
}

const LocationsPage = ({ locations, page, totalPages }: Props) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/locations/page/${value}`);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <MainLayout documentTitle="Episodes">
      <StickyHeader title="Locations" />
      <Grid container justifyContent={"center"}>
        {locations.map((location, i) => {
          return (
            <Grid
              item
              key={i}
              sx={{ margin: 1, width: isSmall ? "100%" : null }}
            >
              <CardItem
                title={location.name}
                href={`/location/${location.id}`}
              />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        count={totalPages}
        shape="rounded"
        page={page}
        onChange={handleChange}
        sx={{ marginTop: 5 }}
      />
    </MainLayout>
  );
};

export default LocationsPage;

export const getStaticPaths = async () => {
  const locationsPageData = await getAllLocations();
  if (!locationsPageData) {
    throw new Error("Invalid Locations Data");
  }
  const paths = [];
  for (let i = 1; i <= Math.floor(locationsPageData.info.pages / 2); i++) {
    paths.push({ params: { page: `${i}` } });
  }
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = context.params || {};
  if (!page || typeof page !== "string") {
    throw Error("No Page Found");
  }
  const pageNum = parseInt(page) * 2;
  const locationsPageData = await getAllLocations(pageNum);
  const secondLocation = await getAllLocations(pageNum + 1);

  if (!locationsPageData) {
    throw new Error(`Invalid Locations Data for page ${page}`);
  }
  return {
    props: {
      locations: [
        ...locationsPageData.results,
        ...(secondLocation?.results ?? []),
      ],
      page: parseInt(page),
      totalPages: Math.floor(locationsPageData.info.pages / 2),
    },
  };
};
