import Head from "next/head";
import Layout from "../../../components/layout";
import Editor from "../../../components/editor";

export default function TokenEditorPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>PxlGen - Token Editor</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <Editor />
      </Layout>
    </div>
  );
}
