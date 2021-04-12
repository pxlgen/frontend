import Head from "next/head";
import Layout from "../../components/layout";
import Token from "../../components/token";

export default function TokenPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>PxlGen - Token</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <Token />
      </Layout>
    </div>
  );
}
