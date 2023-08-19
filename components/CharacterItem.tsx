import React, { useEffect, useState } from "react";
import Character from "../models/Characters";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import format from "date-fns/format";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import { getCharacter } from "../services/apiService";
import DialogTitleItem from "./DialogTitleItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

const CharacterItem = ({
  character,
  url,
  height = 250,
  textVariant = "h5",
}: {
  character?: Character;
  url?: string;
  height?: number;
  textVariant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | "inherit"
    | undefined;
}) => {
  const [characterData, setCharacterData] = useState<Character>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    if (character) {
      setCharacterData(character);
    } else if (url) {
      const id = url
        .replace("https://rickandmortyapi.com/api/", "")
        .split("/")[1];
      getCharacter(id).then((value) => {
        if (value) {
          setCharacterData(value);
        }
      });
    }
  }, [character, url]);
  const [open, setOpen] = React.useState(false);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const [isDialogImageLoaded, setIsDialogImageLoaded] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (!characterData) {
    return (
      <Card sx={{ width: height }}>
        <Skeleton
          variant="rectangular"
          width={height}
          height={height}
          animation="wave"
        />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      </Card>
    );
  }
  return (
    <>
      <Card sx={{ width: height }}>
        <CardActionArea onClick={handleClickOpen}>
          <Image
            alt={characterData.name}
            src={characterData.image}
            height={height}
            width={height}
            onLoad={() => setIsMainImageLoaded(true)}
          />
          {!isMainImageLoaded && (
            <Skeleton
              variant="rectangular"
              width={height}
              height={height}
              animation="wave"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          )}
          <CardContent>
            <Typography
              variant={textVariant}
              component="p"
              textAlign={"center"}
            >
              {characterData.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          fullScreen={fullScreen}
        >
          <DialogTitleItem
            title={characterData.name}
            handleClose={handleClose}
          />
          <DialogContent>
            <Grid
              container
              justifyContent={"space-between"}
              flexDirection="column"
              alignItems={"center"}
            >
              <Grid item xs="auto">
                <div style={{ position: "relative" }}>
                  <Image
                    alt={characterData.name}
                    src={characterData.image}
                    height={200}
                    width={200}
                    onLoad={() => setIsDialogImageLoaded(true)}
                  />
                  {!isDialogImageLoaded && (
                    <Skeleton
                      variant="rectangular"
                      width={200}
                      height={200}
                      animation="wave"
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  )}
                </div>
              </Grid>
              <Grid item>
                <DialogContentText>
                  Species: {characterData.species}
                </DialogContentText>
                <DialogContentText>
                  Gender: {characterData.gender}
                </DialogContentText>
                <DialogContentText>
                  Status: {characterData.status}
                </DialogContentText>
                {characterData?.type?.length > 0 && (
                  <DialogContentText>
                    Type: {characterData.type}
                  </DialogContentText>
                )}
                <DialogContentText>
                  Created:{" "}
                  {format(new Date(characterData.created), "MMMM d, yyyy")}
                </DialogContentText>
                {characterData.origin.url.length > 0 ? (
                  <DialogContentText>
                    Origin:{" "}
                    <Link
                      style={{ color: "#0099FA" }}
                      href={
                        "/location/" +
                        characterData.origin.url
                          .replace("https://rickandmortyapi.com/api/", "")
                          .split("/")[1]
                      }
                      onClick={handleClose}
                    >
                      {characterData.origin.name}
                    </Link>
                  </DialogContentText>
                ) : (
                  <DialogContentText>
                    Origin: {characterData.origin.name}
                  </DialogContentText>
                )}
                {characterData.location.url.length > 0 ? (
                  <DialogContentText>
                    Last Location:{" "}
                    <Link
                      style={{ color: "#0099FA" }}
                      href={
                        "/location/" +
                        characterData.location.url
                          .replace("https://rickandmortyapi.com/api/", "")
                          .split("/")[1]
                      }
                      onClick={handleClose}
                    >
                      {characterData.location.name}
                    </Link>
                  </DialogContentText>
                ) : (
                  <DialogContentText>
                    Last Location: {characterData.location.name}
                  </DialogContentText>
                )}
                <DialogContentText>
                  {characterData.episode.length} Episode(s):
                </DialogContentText>
                <Grid container justifyContent={"center"}>
                  {characterData.episode.map((e, i) => {
                    const episodeNumber = e
                      .replace("https://rickandmortyapi.com/api/", "")
                      .split("/")[1];
                    return (
                      <Grid item key={i} sx={{ margin: 1 }}>
                        <Link
                          href={`/episode/${episodeNumber}`}
                          onClick={handleClose}
                        >
                          <Card>
                            <CardActionArea>
                              <CardContent>
                                <Typography
                                  variant={"body1"}
                                  component="p"
                                  textAlign={"center"}
                                >
                                  {episodeNumber}
                                </Typography>
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
