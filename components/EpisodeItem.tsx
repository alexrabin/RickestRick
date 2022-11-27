import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Episode from "../models/Episode";
import Link from "next/link";
const EpisodeItem = ({ episode }: { episode: Episode }) => {
  return (
    <Link href={`/episode/${episode.id}`}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="p" textAlign={"center"}>
              {episode.episode}: {episode.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default EpisodeItem;
