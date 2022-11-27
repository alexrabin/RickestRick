import React from "react";
import CardItem from "./CardItem";
const cardStyles = {
  margin: 2,
  minWidth: 300,
  textAlign: "center",
};

const HomePageCard = ({ link, title }: { link: string; title: string }) => {
  return <CardItem sx={cardStyles} href={link} title={title} />;
};

export default HomePageCard;
