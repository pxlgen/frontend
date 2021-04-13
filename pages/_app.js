import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../hooks";
import { DAppProvider, MULTICALL_ADDRESSES } from "@usedapp/core";
import { ToastContainer } from "react-toastify";

let chainid = process.env.NEXT_PUBLIC_ACTIVE_CHAINID;
let rinkebyRpc = process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_API_KEY;

const config = {
  readOnlyChainId: parseInt(chainid),
  readOnlyUrls: {
    1337: "http://localhost:8545",
    4: rinkebyRpc,
  },
  multicallAddresses: { 1337: process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDRESS, ...MULTICALL_ADDRESSES },
};

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <DAppProvider config={config}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <ToastContainer position="bottom-left" autoClose={5000} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </ApolloProvider>
    </DAppProvider>
  );
}

export default MyApp;
