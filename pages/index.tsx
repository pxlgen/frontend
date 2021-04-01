import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";

export default function Home() {
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
