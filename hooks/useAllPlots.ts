import { useState, useEffect } from "react";
import { PlotData, ALL_PLOTS_QUERY } from "../apollo/allPlots";
import { ApolloError, useQuery } from "@apollo/client";
import axios from "axios";
import { getDefaultPlot } from "../utils";

export function useAllPlots(): { plots: Plot[] | undefined; loading: boolean; error: ApolloError | undefined } {
  const baseURI = process.env.NEXT_PUBLIC_BASE_URI ?? "";
  const [plots, setPlots] = useState<Plot[]>();
  const { error, data } = useQuery<PlotData>(ALL_PLOTS_QUERY, {});

  console.log(data);
  useEffect(() => {
    async function fetchMetadata() {
      if (data && baseURI) {
        const plotsArray: Plot[] = [];
        // Create array with default properties
        Array.from(Array(400).keys()).forEach((i) => {
          plotsArray.push(getDefaultPlot(i + 1));
        });

        for (let i = 0; i < 400; i++) {
          const index = i + 1;
          const plot: PlotToken | undefined = data.tokens.find((item) => item.index == index);
          if (plot) {
            try {
              const result = await axios(baseURI + plot.ipfsHash);
              const metadata = result.data as PlotMetadata;
              plotsArray[i] = { ...plot, ...metadata };
            } catch (error) {
              console.error(error);
            }
          }
        }

        setPlots(plotsArray);
      }
    }
    void fetchMetadata();
  }, [data, baseURI]);

  return { plots, loading: !plots, error };
}
