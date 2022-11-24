import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import React from "react";
import CharacterItem from "../../components/CharacterItem";
import MainLayout from "../../components/MainLayout";
import Episode from "../../models/Episode";
import { getEpisode } from "../../services/apiService";

const EpisodePage = ({ episode }: { episode: Episode }) => {
  return (
    <MainLayout documentTitle={episode.episode}>
      <Typography variant={"h5"} component="p">
        {episode.name}: {episode.episode}
      </Typography>
      <Typography variant={"body1"} component="p">
        Air Date: {episode.air_date}
      </Typography>
      <Typography variant={"body1"} component="p">
        Characters ({episode.characters.length}):
      </Typography>
      <Grid container justifyContent={"center"}>
        {episode.characters.map((c, i) => {
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

export default EpisodePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { episode } = context.params ?? {};
  if (episode && typeof episode === "string") {
    const episodeData = await getEpisode(episode);
    return {
      props: {
        episode: episodeData,
      },
    };
  }
  return {
    redirect: {
      destination: "/episodes/1",
      permanent: false,
    },
  };
};
