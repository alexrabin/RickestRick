import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import CharacterItem from "../../components/CharacterItem";
import MainLayout from "../../components/MainLayout";
import Episode from "../../models/Episode";
import { getAllEpisodes, getEpisode } from "../../services/apiService";

const EpisodePage = ({
  episode,
  totalEpisodes,
}: {
  episode: Episode;
  totalEpisodes: number;
}) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/episode/${value}`);
  };
  return (
    <MainLayout documentTitle={episode.episode}>
      <Typography variant={"h5"} component="p" textAlign={"center"}>
        {episode.episode}: {episode.name}
      </Typography>
      <Typography variant={"body1"} component="p">
        Air Date: {episode.air_date}
      </Typography>
      <Typography variant={"h6"} component="p">
        {episode.characters.length} Character(s):
      </Typography>
      <Grid container justifyContent={"center"}>
        {episode.characters.map((c, i) => {
          return (
            <Grid item key={i} sx={{ margin: 1 }}>
              <CharacterItem url={c} />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        count={totalEpisodes}
        shape="rounded"
        page={episode.id}
        onChange={handleChange}
        sx={{ marginTop: 5 }}
      />
    </MainLayout>
  );
};

export default EpisodePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { episode } = context.params ?? {};
  if (episode && typeof episode === "string") {
    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=59"
    );
    const episodeData = await getEpisode(episode);
    const allEpisodeData = await getAllEpisodes();
    return {
      props: {
        episode: episodeData,
        totalEpisodes: allEpisodeData.info.count,
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
