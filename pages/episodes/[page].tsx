import { GetStaticProps } from "next";
import React from "react";
import MainLayout from "../../components/MainLayout";
import { getAllEpisodes } from "../../services/apiService";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Episode from "../../models/Episode";
import EpisodeItem from "../../components/EpisodeItem";

interface Props {
  episodes: Episode[];
  page: number;
  totalPages: number;
}

const EpisodesPage = ({ episodes, page, totalPages }: Props) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/episodes/${value}`);
  };

  return (
    <MainLayout documentTitle="Episodes">
      <Typography variant="h4" component="div">
        Episodes
      </Typography>
      <Grid container justifyContent={"center"}>
        {episodes.map((e, i) => {
          return (
            <Grid item key={i} sx={{ margin: 1 }}>
              <EpisodeItem episode={e} />
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

export default EpisodesPage;

export const getStaticPaths = async () => {
  const episodePageData = await getAllEpisodes();
  if (!episodePageData) {
    throw new Error("Invalid Episodes Data");
  }
  const paths = [];
  for (let i = 1; i <= episodePageData.info.pages; i++) {
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
  const episodePageData = await getAllEpisodes(parseInt(page));
  if (!episodePageData) {
    throw new Error(`Invalid Episodes Data for page ${page}`);
  }
  return {
    props: {
      episodes: episodePageData.results,
      page: parseInt(page),
      totalPages: episodePageData.info.pages,
    },
  };
};
