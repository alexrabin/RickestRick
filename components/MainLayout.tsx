import styled from "@emotion/styled";
import CssBaseline from "@mui/material/CssBaseline";
import dynamic from "next/dynamic";
import Head from "next/head";
const NavigationBar = dynamic(() => import("./NavigationBar"));
const LayoutContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
type Props = {
  documentTitle?: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
};

const MainLayout: React.FC<Props> = ({
  documentTitle = null,
  children,
  description = "Are you the Rickest Rick?",
}) => {
  return (
    <div>
      <Head>
        <title>
          {documentTitle && documentTitle.length > 0
            ? `${documentTitle} - Rickest Rick`
            : "Rickest Rick"}
        </title>
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <CssBaseline />
      <LayoutContainer>{children}</LayoutContainer>
    </div>
  );
};
export default MainLayout;
