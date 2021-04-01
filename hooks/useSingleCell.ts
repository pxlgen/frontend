import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { CellData, CellVars, SINGLE_CELL_QUERY } from "../apollo/singleCell";
import { useLazyQuery } from "@apollo/client";
import { useBaseURI } from "./useBaseURI";
import { useRouter } from "next/router";
import { Cell, CellMetadata, CellToken } from "../types";
import axios from "axios";
import { getDefaultCell } from "../utils";

/* 

1) Wait for router to be ready then set the token index from url param
2) When index is set call the gql query to get Cell info
3) If both data and baseURI are now defined we can fetch metadata
4) If cell data or account changes we check and set whether owner is connected
5) Finally if we have the metadata we display the editor

*/

export function useSingleCell() {
  const { chainId } = useEthers();
  const router = useRouter();
  const baseURI = useBaseURI(chainId);
  const [index, setIndex] = useState<number>();
  const [cell, setCell] = useState<Cell>();

  const [getCellInfo, { error, data }] = useLazyQuery<CellData, CellVars>(SINGLE_CELL_QUERY, {
    variables: { index },
  });

  useEffect(() => {
    if (!router.isReady) return;
    setIndex(parseInt(router.query.idx as string));
    getCellInfo();
  }, [router.isReady]);

  useEffect(() => {
    if (cell || !index) return;
    setCell(getDefaultCell(index));
  }, [index]);

  useEffect(() => {
    const fetchData = async () => {
      if (data?.cells.length && baseURI) {
        const result = await axios(baseURI + data.cells[0].ipfsHash);
        const cellToken: CellToken = data?.cells[0];
        const metadata: CellMetadata = result.data;
        setCell({ ...cellToken, ...metadata });
      }
    };
    fetchData();
  }, [data, baseURI]);

  if (error) console.log("Editor GQL ERR - SINGLE_CELL_QUERY:", error);

  return { cell, loading: !cell, error };
}