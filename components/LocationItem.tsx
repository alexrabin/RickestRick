import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Location from "../models/Location";
import Link from "next/link";
const LocationItem = ({ location }: { location: Location }) => {
  return (
    <Link href={`/location/${location.id}`}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="p" textAlign={"center"}>
              {location.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default LocationItem;
