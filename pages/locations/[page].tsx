import { GetStaticProps } from "next";
import React from "react";
import MainLayout from "../../components/MainLayout";
import { getAllLocations } from "../../services/apiService";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Location from "../../models/Location";
import LocationItem from "../../components/LocationItem";

interface Props {
  locations: Location[];
  page: number;
  totalPages: number;
}

const LocationsPage = ({ locations, page, totalPages }: Props) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/locations/${value}`);
  };

  return (
    <MainLayout documentTitle="Episodes">
      <Typography variant="h4" component="div">
        Locations
      </Typography>
      <Grid container justifyContent={"center"}>
        {locations.map((e, i) => {
          return (
            <Grid item key={i} sx={{ margin: 1 }}>
              <LocationItem location={e} />
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
  const paths = [];
  for (let i = 1; i <= locationsPageData.info.pages; i++) {
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
  const locationsPageData = await getAllLocations();
  return {
    props: {
      locations: locationsPageData.results,
      page: parseInt(page),
      totalPages: locationsPageData.info.pages,
    },
  };
};