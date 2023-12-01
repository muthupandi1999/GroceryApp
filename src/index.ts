import { ApolloServer, BaseContext } from "@apollo/server";
import express, { Express, Request, Response, NextFunction } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";
const PORT = 5000;
import { typeDefs, resolvers } from "./graphql";
import { setHttpPlugin } from "./plugins/error.plugin";

import { connectRedis } from "./config/redis";
import { promoExpiery } from "./cron/promo.cron";

//ws
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

const startServer = async () => {
  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  // connectRedis();
  const httpServer = createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // WebSocketServer start listening.
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  promoExpiery.start();
  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // setHttpPlugin,
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        const token = req.headers.authorization ?? "";
        return { req, res, token };
      },
    })
  );

  app.use(express.json({ limit: "140mb" }));
  app.use(express.urlencoded({ limit: "140mb", extended: true }));

  // Now that our HTTP server is fully set up, actually listen.
  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
  });
};
startServer();
