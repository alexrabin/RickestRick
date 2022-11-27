import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import { SxProps, Theme } from "@mui/material/styles";
const CardItem = ({
  href,
  title,
  sx,
}: {
  href: string;
  title: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Card sx={sx}>
      <CardActionArea>
        <Link href={href}>
          <CardContent>
            <Typography variant="h5" component="p" textAlign={"center"}>
              {title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
