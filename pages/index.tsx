import Typography from "@mui/material/Typography";
import MainLayout from "../components/MainLayout";
import OutsideLink from "../components/OutsideLink";
import HomePageCard from "../components/HomePageCard";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <MainLayout>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"86vh"}
      >
        <Typography variant="h3" component="div" textAlign={"center"}>
          The Rickest Rick
        </Typography>
        <Typography
          variant="body1"
          component="p"
          textAlign={"center"}
          margin={3}
        >
          View Characters, Episodes, and Locations from the Rick and Morty TV
          show.
        </Typography>

        <HomePageCard title="Characters" link="/characters" />
        <HomePageCard title="Episodes" link="/episodes" />
        <HomePageCard title="Locations" link="/locations" />
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
          <OutsideLink href="https://mui.com/">MUI</OutsideLink>,{" "}
          <OutsideLink href="https://www.npmjs.com/package/memory-cache">
            memory-cache
          </OutsideLink>
          ,and the{" "}
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
      </Box>
    </MainLayout>
  );
}
