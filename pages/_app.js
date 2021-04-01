import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../hooks";
import { ChainId, DAppProvider, multicallAddresses } from "@usedapp/core";

const config = {
  readOnlyChainId: 1337,
  readOnlyUrls: {
    1337: "http://localhost:8545",
  },
  multicallAddresses: { 1337: process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDRESS, ...multicallAddresses },
};
console.log("process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDRESS", process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDRESS);

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <DAppProvider config={config}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </DAppProvider>
  );
}

export default MyApp;
