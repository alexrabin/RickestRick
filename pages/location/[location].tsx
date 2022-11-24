import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import React from "react";
import CharacterItem from "../../components/CharacterItem";
import MainLayout from "../../components/MainLayout";
import Location from "../../models/Location";
import { getLocation } from "../../services/apiService";

const LocationPage = ({ location }: { location: Location }) => {
  return (
    <MainLayout documentTitle={location.name}>
      <Typography variant={"h5"} component="p">
        Type: {location.type}
      </Typography>
      <Typography variant={"body1"} component="p">
        Dimension: {location.dimension}
      </Typography>
      <Typography variant={"body1"} component="p">
        Residents ({location.residents.length}):
      </Typography>
      <Grid container justifyContent={"center"}>
        {location.residents.map((c, i) => {
          return (
            <Grid item key={i} sx={{ margin: 1 }}>
              <CharacterItem url={c} height={70} textVariant={"body1"} />
            </Grid>
          );
        })}
      </Grid>
    </MainLayout>
  );
};

export default LocationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { location } = context.params ?? {};
  if (location && typeof location === "string") {
    const locationData = await getLocation(location);
    return {
      props: {
        location: locationData,
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
