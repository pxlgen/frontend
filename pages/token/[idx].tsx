import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Canvas from "../../components/canvas";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

const TOKEN_QUERY = gql`
  query Cell($index: Int!) {
    cells(where: { index: $index }) {
      id
      owner
      ipfsHash
      index
    }
  }
`;

export default function Token(): JSX.Element {
  const router = useRouter();
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    if (!router.isReady) return;
    setIndex(parseInt(router.query.idx as string));
    getCellInfo();
  }, [router.isReady]);

  const [getCellInfo, { loading, error, data }] = useLazyQuery(TOKEN_QUERY, {
    variables: { index },
  });

  // console.log(loading);
  console.log(data);
  console.log(error);

  if (loading) return <p>Loading ...</p>;

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}
