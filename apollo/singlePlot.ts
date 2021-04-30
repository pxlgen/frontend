import { gql } from "@apollo/client";

interface PlotData {
  tokens: PlotToken[];
}

interface PlotVars {
  index: number | undefined;
}

const SINGLE_PLOT_QUERY = gql`
  query Plot($index: Int!) {
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

export { SINGLE_PLOT_QUERY };
export type { PlotData, PlotVars };
