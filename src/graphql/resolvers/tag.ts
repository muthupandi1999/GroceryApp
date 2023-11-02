import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { GraphQLError } from "graphql";
import { verifyToken_api } from "../../validation/token.validation";


export default {
  Query: {
    getTagById: async (_: any, { id }: { id: string }, context: any) => {
      let status = await verifyToken_api(context.token);
      if (status) {
        const tag = await prisma.tags.findUnique({
          where: {
            id,
          },
        });
        return tag;
      }
      throw new GraphQLError("Unauthorized", {
        extensions: {
          http: {
            status: 401,
          },
        },
      });
    },

    getAllTags: async (_:any) => {
      // let status = await verifyToken_api(context.token);

      // if (!status) {
      //   throw createGraphQLError("Unauthorized", 401);
      // }

      
      const tags = await prisma.tags.findMany();
      return tags;
    },
  },
  Mutation: {
    createCoupon: async (
      _: any,
      { name }: { name: string },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      const tag = await prisma.tags.create({
        data: {name},
      });
      return tag;
      //   }
      //   throw createGraphQLError("Unauthorized", 401);
    },
    updateCouponById: async (
      _: any,
      { id, name }: { id: string; name: string },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      return await prisma.tags.update({ where: { id }, data: {name} });
      //   }

      //   throw createGraphQLError("Unauthorized", 401);
    },
    deleteCouponById: async (_: any, { id }: { id: string }, context: any) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      return await prisma.tags.delete({ where: { id } });
      //   }
      //   throw createGraphQLError("Unauthorized", 401);
    },

    
  },
 
};
