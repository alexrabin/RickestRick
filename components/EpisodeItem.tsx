import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Episode from "../models/Episode";
import Grid from "@mui/material/Grid";
import CharacterItem from "./CharacterItem";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
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
          <DialogTitle id="alert-dialog-title">
            <Grid
              container
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Grid item>
                {episode.name}: {episode.episode}
              </Grid>
              <Grid item>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
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
