import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
const cardStyles = {
  margin: 2,
  minWidth: 300,
  textAlign: "center",
};

const HomePageCard = ({ link, title }: { link: string; title: string }) => {
  return (
    <Card sx={cardStyles}>
      <CardActionArea>
        <Link href={link}>
          <CardContent>
            <Typography variant="h5" component="p">
              {title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default HomePageCard;
