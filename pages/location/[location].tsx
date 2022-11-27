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
import Character from "../../models/Characters";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
const LocationPage = ({
  location,
  characters,
  totalLocations,
}: {
  location: Location;
  characters: Character[] | null;
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
      <StickyHeader
        title={`${location.name}`}
        leftActionItem={
          <Button onClick={() => router.push("/locations")}>
            <ArrowBackIos /> Locations
          </Button>
        }
      />
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
        {characters && characters.length > 0
          ? characters.map((c, i) => {
              return (
                <Grid item key={i} sx={{ margin: 1 }}>
                  <CharacterItem character={c} />
                </Grid>
              );
            })
          : location.residents.map((c, i) => {
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
      "public, s-maxage=60, stale-while-revalidate=59"
    );
    const [locationData, characters] = await getLocation(location, true);
    if (!locationData) {
      return {
        redirect: {
          destination: "/locations/page/1",
          permanent: false,
        },
      };
    }
    const allLocationsData = await getAllLocations();
    return {
      props: {
        location: locationData,
        characters,
        totalLocations: allLocationsData?.info.count,
      },
    };
  }
  return {
    redirect: {
      destination: "/locations/page/1",
      permanent: false,
    },
  };
};
