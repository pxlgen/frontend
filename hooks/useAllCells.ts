import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { CellData, ALL_CELLS_QUERY } from "../apollo/allCells";
import { ApolloError, useQuery } from "@apollo/client";
import { useBaseURI } from "./useBaseURI";
import axios from "axios";
import { getDefaultCell } from "../utils";

export function useAllCells(): { cells: Cell[] | undefined; loading: boolean; error: ApolloError | undefined } {
  const { chainId } = useEthers();
  const baseURI = useBaseURI(chainId);
  const [cells, setCells] = useState<Cell[]>();
  const { error, data } = useQuery<CellData>(ALL_CELLS_QUERY, {});

  useEffect(() => {
    async function fetchMetadata() {
      if (data && baseURI) {
        const cellsArray: Cell[] = [];
        // Create array with default properties
        Array.from(Array(400).keys()).forEach((i) => {
          cellsArray.push(getDefaultCell(i + 1));
        });

        for (let i = 0; i < 400; i++) {
          const index = i + 1;
          const cell: CellToken | undefined = data.tokens.find((item) => item.index == index);
          if (cell) {
            try {
              const result = await axios(baseURI + cell.ipfsHash);
              const metadata = result.data as CellMetadata;
              cellsArray[i] = { ...cell, ...metadata };
            } catch (error) {
              console.error(error);
            }
          }
        }

        setCells(cellsArray);
      }
    }
    void fetchMetadata();
  }, [data, baseURI]);

  console.log("useAllCells Cells Array: ", cells);
  console.log("useAllCells Cells Array: ", cells);

  return { cells, loading: !cells, error };
}
