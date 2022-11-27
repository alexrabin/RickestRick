const EmptyPage = () => {
  return null;
};

export default EmptyPage;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/episodes/page/1",
      permanent: true,
    },
  };
};
