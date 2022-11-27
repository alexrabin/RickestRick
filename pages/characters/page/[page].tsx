import Grid from "@mui/material/Grid";
import { GetStaticProps } from "next";
import React from "react";
import MainLayout from "../../../components/MainLayout";
import Character from "../../../models/Characters";
import { getAllCharacters } from "../../../services/apiService";
import CharacterItem from "../../../components/CharacterItem";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StickyHeader from "../../../components/StickyHeader";
interface Props {
  characters: Character[];
  page: number;
  totalPages: number;
}

const CharactersPage = ({ characters, page, totalPages }: Props) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/characters/page/${value}`);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <MainLayout documentTitle="Characters">
      <StickyHeader title="Characters" />
      <Grid container justifyContent={"center"}>
        {characters.map((c, i) => {
          return (
            <Grid item key={i} sx={{ margin: 1 }}>
              <CharacterItem character={c} />
            </Grid>
          );
        })}
      </Grid>
      <Pagination
        size={isSmall ? "small" : "large"}
        count={totalPages}
        shape="rounded"
        page={page}
        onChange={handleChange}
        sx={{ marginTop: 5 }}
        boundaryCount={3}
      />
    </MainLayout>
  );
};

export default CharactersPage;

export const getStaticPaths = async () => {
  const characterData = await getAllCharacters();
  if (!characterData) {
    throw new Error("Invalid Character Data");
  }
  const paths = [];
  for (let i = 1; i <= characterData.info.pages; i++) {
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
  const characterPageData = await getAllCharacters(parseInt(page));
  if (!characterPageData) {
    throw new Error(`Invalid Character Data for page: ${page}`);
  }
  return {
    props: {
      characters: characterPageData.results,
      page: parseInt(page),
      totalPages: characterPageData.info.pages,
    },
  };
};
