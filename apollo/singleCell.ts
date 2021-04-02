import { gql } from "@apollo/client";

interface CellData {
  tokens: CellToken[];
}

interface CellVars {
  index: number | undefined;
}

const SINGLE_CELL_QUERY = gql`
  query Cell($index: Int!) {
    tokens(where: { index: $index }) {
      id
      ipfsHash
      index
      type
      owner {
        id
      }
    }
  }
`;

export { SINGLE_CELL_QUERY };
export type { CellData, CellVars };
