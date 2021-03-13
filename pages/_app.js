import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../hooks/useApollo";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
