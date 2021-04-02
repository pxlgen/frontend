import { gql } from "@apollo/client";

interface CellData {
  tokens: CellToken[];
}

interface CellVars {
  type: string;
}

const ALL_CELLS_QUERY = gql`
  query {
    tokens(where: { type: "Cell" }) {
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

export { ALL_CELLS_QUERY };
export type { CellData, CellVars };
