import React from "react";
import Character from "../models/Characters";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import format from "date-fns/format";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Image from "next/image";

const CharacterItem = ({ character }: { character: Character }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(character);
  return (
    <>
      <Card>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component={"img"}
            alt={character.name}
            src={character.image}
            height="150"
          />
          <CardContent>
            <Typography variant="h5" component="p">
              {character.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{character.name}</DialogTitle>
          <DialogContent>
            <Grid
              container
              justifyContent={"space-between"}
              flexDirection="column"
              alignItems={"center"}
            >
              <Grid item xs="auto">
                <Image
                  src={character.image}
                  alt={character.name}
                  height={200}
                  width={200}
                />
              </Grid>
              <Grid item>
                <DialogContentText>
                  Species: {character.species}
                </DialogContentText>
                <DialogContentText>
                  Gender: {character.gender}
                </DialogContentText>
                <DialogContentText>
                  Status: {character.status}
                </DialogContentText>
                {character.type.length > 0 && (
                  <DialogContentText>Type: {character.type}</DialogContentText>
                )}
                <DialogContentText>
                  Created: {format(new Date(character.created), "MMMM d, yyyy")}
                </DialogContentText>
                <DialogContentText>
                  Origin: {character.origin.name}
                </DialogContentText>
                {character.location.url.length > 0 && (
                  <DialogContentText>
                    Location:{" "}
                    <Link
                      style={{ color: "#0099FA" }}
                      href={
                        "/location/" +
                        character.location.url
                          .replace("https://rickandmortyapi.com/api/", "")
                          .split("/")[1]
                      }
                    >
                      {character.location.name}
                    </Link>
                  </DialogContentText>
                )}
                <DialogContentText>Episode(s):</DialogContentText>
                <Grid container>
                  {character.episode.map((e, i) => {
                    const episodeNumber = e
                      .replace("https://rickandmortyapi.com/api/", "")
                      .split("/")[1];
                    return (
                      <Grid item key={i} sx={{ margin: 1 }}>
                        <Link href={`/episode/${episodeNumber}`}>
                          <Card>
                            <CardActionArea>
                              <CardContent>
                                <p>{episodeNumber}</p>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Link>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default CharacterItem;
