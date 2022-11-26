import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
const StickyHeader = ({ title }: { title: string }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Typography
      variant={"h4"}
      component="p"
      textAlign={"center"}
      sx={{
        backgroundColor: "white",
        width: "100%",
        position: "sticky",
        top: isSmall ? 50 : 60,
        left: 0,
        padding: 2,
        zIndex: 100,
      }}
    >
      {title}
    </Typography>
  );
};

export default StickyHeader;
