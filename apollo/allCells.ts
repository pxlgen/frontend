import { gql } from "@apollo/client";

interface CellData {
  cells: CellToken[];
}

interface CellVars {
  index: number | undefined;
}

const ALL_CELLS_QUERY = gql`
  query {
    cells {
      id
      owner
      ipfsHash
      index
    }
  }
`;

export { ALL_CELLS_QUERY };
export type { CellData, CellVars };
