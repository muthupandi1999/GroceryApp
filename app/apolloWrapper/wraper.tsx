"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://192.168.7.49:5000/graphql",
    cache: new InMemoryCache(),
  });
};
// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <ApolloNextAppProvider makeClient={createApolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

// "use client"
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   NextSSRApolloClient ,
//   NextSSRInMemoryCache
// } from "@apollo/experimental-nextjs-app-support/ssr";

// const createApolloClient = () => {
//     return new NextSSRApolloClient({
//       uri: "http://192.168.7.49:5000/graphql",
//       cache: new NextSSRInMemoryCache (),
//     });
//   };
// // you need to create a component to wrap your app in
// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return (
//     <ApolloNextAppProvider makeClient={createApolloClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }



// "use client";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";


// import { split, HttpLink } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';

// const httpLink = new HttpLink({
//   uri: 'http://localhost:5000/graphql'
// });

// const wsLink = new GraphQLWsLink(createClient({
//   url: 'ws://localhost:5000/graphql',
// }));

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );


// const createApolloClient = () => {
//   return  new ApolloClient({
//     link: splitLink,
//     cache: new InMemoryCache(),
//   });
// };
// // you need to create a component to wrap your app in
// export function ApolloWrapper({ children }: Readonly<React.PropsWithChildren>) {
//   return (
//     <ApolloNextAppProvider makeClient={createApolloClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }

// "use client"
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import {
//   ApolloNextAppProvider,
//   NextSSRApolloClient ,
//   NextSSRInMemoryCache
// } from "@apollo/experimental-nextjs-app-support/ssr";

// const createApolloClient = () => {
//     return new NextSSRApolloClient({
//       uri: "http://192.168.7.49:5000/graphql",
//       cache: new NextSSRInMemoryCache (),
//     });
//   };
// // you need to create a component to wrap your app in
// export function ApolloWrapper({ children }: React.PropsWithChildren) {
//   return (
//     <ApolloNextAppProvider makeClient={createApolloClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }
