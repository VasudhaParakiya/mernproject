import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { GQL_URL } from "./config";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      },
    };
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:5050/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:5050/graphql",
    // url: "ws://localhost:5050/subscriptions",

    connectionParams: () => ({
      authToken: localStorage.getItem("token"),
    }),
    // Adding reconnection logic
    on: {
      connected: () => console.log("WebSocket connected"),
      closed: () => console.log("WebSocket closed"),
      error: (err) => console.error("WebSocket error", err),
    },
    lazy: true, // Lazy connect
    reconnect: true, // Enable auto-reconnect
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

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
  link: errorLink.concat(splitLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   link: errorLink.concat(authLink.concat(httpLink, wsLink)),
//   cache: new InMemoryCache(),
// });

export default client;
