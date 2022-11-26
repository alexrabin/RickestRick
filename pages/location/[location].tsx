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
  return (
    <MainLayout documentTitle={location.name}>
      <Typography variant={"h5"} component="p" textAlign={"center"}>
        Location: {location.name}
      </Typography>
      <Typography variant={"body1"} component="p">
        Type: {location.type}
      </Typography>
      <Typography variant={"body1"} component="p">
        Dimension: {location.dimension}
      </Typography>
      <Typography variant={"h6"} component="p">
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
        count={totalLocations}
        shape="rounded"
        page={location.id}
        onChange={handleChange}
        sx={{ marginTop: 5 }}
      />
    </MainLayout>
  );
};

export default LocationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { location } = context.params ?? {};
  if (location && typeof location === "string") {
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
