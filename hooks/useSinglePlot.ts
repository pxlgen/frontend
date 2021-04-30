import { useState, useEffect } from "react";
import { PlotData, PlotVars, SINGLE_PLOT_QUERY } from "../apollo/singlePlot";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import axios from "axios";
import { getDefaultPlot } from "../utils";

/* 

1) Wait for router to be ready then set the token index from url param
2) When index is set call the gql query to get Plot info
3) If both data and baseURI are now defined we can fetch metadata
4) If plot data or account changes we check and set whether owner is connected
5) Finally if we have the metadata we display the editor

*/

export function useSinglePlot(): { plot: Plot | undefined; loading: boolean; error: ApolloError | undefined } {
  const router = useRouter();
  const baseURI = process.env.NEXT_PUBLIC_BASE_URI ?? "";
  const [index, setIndex] = useState<number>();
  const [plot, setPlot] = useState<Plot>();

  const [getPlotInfo, { error, data }] = useLazyQuery<PlotData, PlotVars>(SINGLE_PLOT_QUERY, {
    variables: { index },
  });

  useEffect(() => {
    if (!router.isReady) return;
    setIndex(parseInt(router.query.idx as string));
    getPlotInfo();
  }, [router.isReady]);

  useEffect(() => {
    if (plot || !index) return;
    setPlot(getDefaultPlot(index));
  }, [index, plot]);

  useEffect(() => {
    const fetchData = async () => {
      if (data?.tokens.length && baseURI) {
        const result = await axios(baseURI + data.tokens[0].ipfsHash);
        const plotToken: PlotToken = data?.tokens[0];
        const metadata = result.data as PlotMetadata;
        setPlot({ ...plotToken, ...metadata });
      }
    };
    void fetchData();
  }, [data, baseURI]);

  if (error) console.log("Editor GQL ERR - SINGLE_PLOT_QUERY:", error);

  return { plot, loading: !plot, error };
}
