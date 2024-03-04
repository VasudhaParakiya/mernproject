import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { GQL_URL } from "./config";
const httpLink = createHttpLink({
  uri: GQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        ...headers,
        token: token ? token : "",
      },
    };
  }
});
// console.log("🚀 ~ authLink ~ authLink:", authLink);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      // Check if extensions exist and if there is a code
      if (extensions && extensions.code) {
        console.log(
          `[GraphQL error]: Code: ${extensions.code}, Message: ${message}`
        );
      }
      // Additional logging of GraphQL error details
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      // Handle specific error codes if needed UNAUTHENTICATED
      if (extensions && extensions.code === "UNAUTHENTICATED") {
        // Redirect to login or perform other actions
        localStorage.clear();
        window.location.replace("/login");
      }
      
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
