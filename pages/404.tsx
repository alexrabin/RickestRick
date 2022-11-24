import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import MainLayout from "../components/MainLayout";

const NotFoundPage = () => {
  const router = useRouter();

  const goHome = useCallback(() => {
    router.replace("/");
  }, [router]);
  return (
    <MainLayout documentTitle="Not Found">
      <Typography variant="h5">Oh no, there&apos;s nothing here!</Typography>
      <Button onClick={goHome}>Head Back Home</Button>
    </MainLayout>
  );
};

export default NotFoundPage;
