import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { GetStaticProps } from "next";
import React from "react";
import MainLayout from "../../components/MainLayout";
import Character from "../../models/Characters";
import { getAllCharacters } from "../../services/apiService";
import CardContent from "@mui/material/CardContent";

interface Props {
  characters: Character[];
  page: number;
  totalPages: number;
}

const CharactersPage = ({ characters, page, totalPages }: Props) => {
  return (
    <MainLayout documentTitle="Characters">
      <Typography variant="h3" component="div">
        Characters
      </Typography>
      <Grid container>
        {characters.map((c, i) => {
          return (
            <Grid item key={i} sx={{ margin: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="p">
                    {c.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
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
      page,
      totalPages: characterPageData.info.pages,
    },
  };
};
