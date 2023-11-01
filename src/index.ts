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
const startServer = async () => {
  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  // connectRedis();
  const httpServer = createServer(app);

  promoExpiery.start();
  // Set up ApolloServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // setHttpPlugin,
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
