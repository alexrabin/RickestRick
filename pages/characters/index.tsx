const EmptyPage = () => {
  return null;
};

export default EmptyPage;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/characters/1",
      permanent: true,
    },
  };
};
