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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StickyHeader from "../../components/StickyHeader";
import Character from "../../models/Characters";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
const EpisodePage = ({
  episode,
  characters,
  totalEpisodes,
}: {
  episode: Episode;
  characters: Character[] | null;
  totalEpisodes: number;
}) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/episode/${value}`);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MainLayout documentTitle={episode.episode}>
      <StickyHeader
        title={`${episode.episode}: ${episode.name}`}
        leftActionItem={
          <Button onClick={() => router.push("/episodes")}>
            <ArrowBackIos /> Episodes
          </Button>
        }
      />
      <Typography variant={"h6"} component="p">
        Air Date: {episode.air_date}
      </Typography>
      <Typography variant={"h5"} component="p">
        {episode.characters.length} Character(s):
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
          : episode.characters.map((c, i) => {
              return (
                <Grid item key={i} sx={{ margin: 1 }}>
                  <CharacterItem url={c} />
                </Grid>
              );
            })}
      </Grid>
      <Pagination
        size={isSmall ? "small" : "large"}
        count={totalEpisodes}
        shape="rounded"
        page={episode.id}
        onChange={handleChange}
        sx={{ marginTop: 5 }}
        boundaryCount={3}
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
      "public, s-maxage=60, stale-while-revalidate=59"
    );
    const [episodeData, characters] = await getEpisode(episode, true);
    if (!episodeData) {
      return {
        redirect: {
          destination: "/episodes/page/1",
          permanent: false,
        },
      };
    }
    const allEpisodeData = await getAllEpisodes();
    return {
      props: {
        episode: episodeData,
        characters,
        totalEpisodes: allEpisodeData?.info.count,
      },
    };
  }
  return {
    redirect: {
      destination: "/episodes/page/1",
      permanent: false,
    },
  };
};
