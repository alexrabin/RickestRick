import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import CharacterItem from "./CharacterItem";
import Location from "../models/Location";
import DialogTitleItem from "./DialogTitleItem";

const LocationItem = ({ location }: { location: Location }) => {
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
              {location.name}
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
          <DialogTitleItem title={location.name} handleClose={handleClose} />
          <DialogContent>
            <DialogContentText>Type: {location.type}</DialogContentText>
            <DialogContentText>
              Dimension: {location.dimension}
            </DialogContentText>
            <DialogContentText>
              Residents ({location.residents.length}):
              <Grid container justifyContent={"center"}>
                {location.residents.map((c, i) => {
                  return (
                    <Grid item key={i} sx={{ margin: 1 }}>
                      <CharacterItem url={c} textVariant={"body1"} />
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

export default LocationItem;
