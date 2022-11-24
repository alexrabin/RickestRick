import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";

const NavigationBar = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Link href={"/"}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              padding: 1,
            }}
          >
            Rick-est Rick
          </Typography>
        </Link>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
