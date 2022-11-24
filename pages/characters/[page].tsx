import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { GetStaticProps } from "next";
import React from "react";
import MainLayout from "../../components/MainLayout";
import Character from "../../models/Characters";
import { getAllCharacters } from "../../services/apiService";
import CharacterItem from "../../components/CharacterItem";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";

interface Props {
  characters: Character[];
  page: number;
  totalPages: number;
}

const CharactersPage = ({ characters, page, totalPages }: Props) => {
  const router = useRouter();
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/characters/${value}`);
  };

  return (
    <MainLayout documentTitle="Characters">
      <Typography variant="h4" component="div">
        Characters
      </Typography>
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
        count={totalPages}
        shape="rounded"
        page={page}
        onChange={handleChange}
        sx={{ marginTop: 5 }}
      />
    </MainLayout>
  );
};

export default CharactersPage;

export const getStaticPaths = async () => {
  const characterData = await getAllCharacters();
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
  return {
    props: {
      characters: characterPageData.results,
      page: parseInt(page),
      totalPages: characterPageData.info.pages,
    },
  };
};
