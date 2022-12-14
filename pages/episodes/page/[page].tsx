import { GetStaticProps } from "next";
import React from "react";
import MainLayout from "../../../components/MainLayout";
import { getAllEpisodes } from "../../../services/apiService";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Episode from "../../../models/Episode";
import StickyHeader from "../../../components/StickyHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CardItem from "../../../components/CardItem";
interface Props {
  episodes: Episode[];
  page: number;
  totalPages: number;
}

const EpisodesPage = ({ episodes, page, totalPages }: Props) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/episodes/page/${value}`);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <MainLayout documentTitle="Episodes">
      <StickyHeader title="Episodes" />
      <Grid container justifyContent={"center"}>
        {episodes.map((e, i) => {
          return (
            <Grid
              item
              key={i}
              sx={{ margin: 1, width: isSmall ? "100%" : null }}
            >
              <CardItem
                title={`${e.episode}: ${e.name}`}
                href={`/episode/${e.id}`}
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
