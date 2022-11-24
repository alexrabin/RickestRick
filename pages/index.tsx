import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MainLayout from "../components/MainLayout";
import Link from "next/link";

const cardStyles = {
  margin: 2,
  minWidth: 300,
  textAlign: "center",
};

export default function Home() {
  return (
    <MainLayout>
      <Typography variant="h3" component="div">
        The Rick-est Rick
      </Typography>
      <Typography variant="subtitle1" component="p" sx={{ margin: 3 }}>
        View Characters, Episodes, and Locations from the Rick and Morty TV
        show.
      </Typography>
      <Card sx={cardStyles}>
        <CardActionArea>
          <Link href={"/characters"}>
            <CardContent>
              <Typography variant="h5" component="p">
                Characters
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <Card sx={cardStyles}>
        <CardActionArea>
          <Link href={"/episodes"}>
            <CardContent>
              <Typography variant="h5" component="p">
                Episodes
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <Card sx={cardStyles}>
        <CardActionArea>
          <Link href={"/locations"}>
            <CardContent>
              <Typography variant="h5" component="p">
                Locations
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </MainLayout>
  );
}
