import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import CharacterItem from "../../components/CharacterItem";
import MainLayout from "../../components/MainLayout";
import Location from "../../models/Location";
import { getAllLocations, getLocation } from "../../services/apiService";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StickyHeader from "../../components/StickyHeader";
const LocationPage = ({
  location,
  totalLocations,
}: {
  location: Location;
  totalLocations: number;
}) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/location/${value}`);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MainLayout documentTitle={location.name}>
      <StickyHeader title={`Location: ${location.name}`} />
      <Typography variant={"h6"} component="p">
        Type: {location.type}
      </Typography>
      <Typography variant={"h6"} component="p">
        Dimension: {location.dimension}
      </Typography>
      <Typography variant={"h5"} component="p">
        {location.residents.length} Resident(s):
      </Typography>
      <Grid container justifyContent={"center"}>
        {location.residents.map((c, i) => {
          return (
            <Grid item key={i} sx={{ margin: 1 }}>
              <CharacterItem url={c} />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        size={isSmall ? "small" : "large"}
        count={totalLocations}
        shape="rounded"
        page={location.id}
        onChange={handleChange}
        sx={{ marginTop: 5 }}
        boundaryCount={3}
      />
    </MainLayout>
  );
};

export default LocationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { location } = context.params ?? {};
  if (location && typeof location === "string") {
    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=59"
    );
    const locationData = await getLocation(location);
    const allLocationsData = await getAllLocations();

    return {
      props: {
        location: locationData,
        totalLocations: allLocationsData.info.count,
      },
    };
  }
  return {
    redirect: {
      destination: "/locations/1",
      permanent: false,
    },
  };
};
