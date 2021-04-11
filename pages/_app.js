import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../hooks";
import { DAppProvider, MULTICALL_ADDRESSES } from "@usedapp/core";
import { ToastContainer } from "react-toastify";

const config = {
  readOnlyChainId: 1337,
  readOnlyUrls: {
    1337: "http://localhost:8545",
  },
  multicallAddresses: { 1337: process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDRESS, ...MULTICALL_ADDRESSES },
};
console.log("process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDRESS", process.env.NEXT_PUBLIC_LOCAL_MULTICALL_ADDRESS);

// // temporarily force client side rendering
// function SafeHydrate({ children }) {
//   return <div suppressHydrationWarning>{typeof window === "undefined" ? null : children}</div>;
// }

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
