import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MainLayout from "../components/MainLayout";
import Link from "next/link";
import OutsideLink from "../components/OutsideLink";

const cardStyles = {
  margin: 2,
  minWidth: 300,
  textAlign: "center",
};

export default function Home() {
  return (
    <MainLayout>
      <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
        The Rickest Rick
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ margin: 3, textAlign: "center" }}
      >
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
      <Typography
        variant="body1"
        component="p"
        sx={{ margin: 3, textAlign: "center" }}
      >
        This site is powered by{" "}
        <OutsideLink href="https://nextjs.org/">Next.js</OutsideLink>,{" "}
        <OutsideLink href="https://axios-http.com/docs/intro">
          Axios
        </OutsideLink>
        ,{" "}
        <OutsideLink href="https://www.npmjs.com/package/nextjs-progressbar">
          nextjs-progressbar
        </OutsideLink>
        , <OutsideLink href="https://favicon.io">favicon.io</OutsideLink>,{" "}
        <OutsideLink href="https://mui.com/">MUI</OutsideLink>, and the{" "}
        <OutsideLink href="https://rickandmortyapi.com/">
          Rick & Morty API
        </OutsideLink>
        . View the code for this site{" "}
        <OutsideLink href="https://github.com/alexrabin/RickestRick">
          here
        </OutsideLink>
        .
      </Typography>
      <Typography
        variant="body2"
        component="p"
        sx={{ margin: 3, textAlign: "center" }}
      >
        Put together by{" "}
        <OutsideLink href="https://alexrabin.com">Alex Rabin</OutsideLink>.
      </Typography>
    </MainLayout>
  );
}
