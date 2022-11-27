import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
const StickyHeader = ({
  title,
  leftActionItem,
}: {
  title: string;
  leftActionItem?: JSX.Element | JSX.Element[];
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      justifyContent={leftActionItem ? "space-between" : "center"}
      alignItems="center"
      sx={{
        position: "sticky",
        top: isSmall ? 50 : 60,
        left: 0,
        padding: 3,
        paddingBottom: 1,
        zIndex: 100,
        backgroundColor: "white",
        width: "100%",
      }}
    >
      {leftActionItem && <Grid item>{leftActionItem}</Grid>}
      <Grid item>
        <Typography
          component="p"
          textAlign={"center"}
          sx={{
            typography: { xs: "h6", sm: "h5", md: "h4", lg: "h4", xl: "h4" },
          }}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StickyHeader;
