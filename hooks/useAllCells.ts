import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { CellData, ALL_CELLS_QUERY } from "../apollo/allCells";
import { useQuery } from "@apollo/client";
import { useBaseURI } from "./useBaseURI";
import axios from "axios";
import { getDefaultCell } from "../utils";

export function useAllCells() {
  const { chainId } = useEthers();
  const baseURI = useBaseURI(chainId);
  const [cells, setCells] = useState<Cell[]>();
  const { error, data } = useQuery<CellData>(ALL_CELLS_QUERY, {});

  useEffect(() => {
    async function fetchMetadata() {
      if (data && baseURI) {
        let cellsArray: Cell[] = [];
        // Create array with default properties
        Array.from(Array(400).keys()).forEach(async (i) => {
          cellsArray.push(getDefaultCell(i + 1));
        });

        for (let i = 0; i < 400; i++) {
          const index = i + 1;
          let cell: CellToken | undefined = data?.tokens.find((item) => item.index == index);
          if (cell) {
            const result = await axios(baseURI + cell.ipfsHash);
            const metadata: CellMetadata = result.data;
            cellsArray[i] = { ...cell, ...metadata };
          }
        }

        setCells(cellsArray);
      }
    }
    fetchMetadata();
  }, [data, baseURI]);

  return { cells, loading: !cells, error };
}
