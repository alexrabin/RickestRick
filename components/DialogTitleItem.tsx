import React from "react";
import Close from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

const DialogTitleItem = ({
  title,
  handleClose,
}: {
  title: string;
  handleClose: () => void;
}) => {
  return (
    <DialogTitle id="alert-dialog-title">
      <Grid container justifyContent={"space-between"} alignItems="center">
        <Grid item>{title}</Grid>
        <Grid item>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
      </Grid>
    </DialogTitle>
  );
};

export default DialogTitleItem;
