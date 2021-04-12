import Head from "next/head";
import Layout from "../../components/layout";
import Canvas from "../../components/canvas";

export default function CanvasPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>PxlGen - Canvas</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <Canvas />
      </Layout>
    </div>
  );
}
