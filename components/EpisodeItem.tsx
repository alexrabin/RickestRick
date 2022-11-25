import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Episode from "../models/Episode";
import Grid from "@mui/material/Grid";
import CharacterItem from "./CharacterItem";
import DialogTitleItem from "./DialogTitleItem";
const EpisodeItem = ({ episode }: { episode: Episode }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card>
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography variant="h5" component="p">
              {episode.name}: {episode.episode}
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
          <DialogTitleItem
            title={`${episode.name}: ${episode.episode}`}
            handleClose={handleClose}
          />
          <DialogContent>
            <DialogContentText>Air Date: {episode.air_date}</DialogContentText>
            <DialogContentText>
              Characters ({episode.characters.length}):
              <Grid container justifyContent={"center"}>
                {episode.characters.map((c, i) => {
                  return (
                    <Grid item key={i} sx={{ margin: 1 }}>
                      <CharacterItem
                        url={c}
                        height={70}
                        textVariant={"body1"}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default EpisodeItem;
