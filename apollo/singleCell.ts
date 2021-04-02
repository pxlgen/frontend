import { gql } from "@apollo/client";

interface CellData {
  cells: CellToken[];
}

interface CellVars {
  index: number | undefined;
}

const SINGLE_CELL_QUERY = gql`
  query Cell($index: Int!) {
    cells(where: { index: $index }) {
      id
      owner
      ipfsHash
      index
    }
  }
`;

export { SINGLE_CELL_QUERY };
export type { CellData, CellVars };
