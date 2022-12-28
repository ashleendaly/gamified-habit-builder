import Layout from "./core/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="w-screen flex flex-col items-center justify-center p-20">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-400">
          Hello React
        </h1>
      </div>
    </Layout>
  );
};

export default Home;
