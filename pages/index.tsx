import Head from "next/head";
import Layout from "../components/layout";

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>PxlGen</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <div></div>
      </Layout>
    </div>
  );
}
