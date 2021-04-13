import { gql } from "@apollo/client";

interface PlotData {
  tokens: PlotToken[];
}

interface PlotVars {
  type: string;
}

const ALL_PLOTS_QUERY = gql`
  query {
    tokens(where: { type: "Plot" }) {
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

export { ALL_PLOTS_QUERY };
export type { PlotData, PlotVars };
