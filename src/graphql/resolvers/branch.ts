import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { createBranch } from "../../types/branch";
import { verifyToken_api } from "../../validation/token.validation";

export default {
  Query: {
    getBranch: async (_: any, { branchId }: { branchId: string }) => {
      let branch = await prisma.branch.findUnique({
        where: { id: branchId },
        include:{
          products:{include:{variant:true, image:true, ProductType:{include:{productCategory:true}}}},
          
        }
      });
      if (branch) {
        return branch;
      }
      throw createGraphQLError("Branch not found", 404);
    },
    getAllBranchs: async (_: any) => {
      let branchs = await prisma.branch.findMany();

      return branchs;
    },
  },
  Mutation: {
    createBranch: async (
      _: any,
      { input }: { input: createBranch },
      context: any
    ) => {
      let status = await verifyToken_api(context.token);
      if (status && status?.res?.role.includes("admin")) {
        let { name, phoneNo, latitude, longitude } = input;
        let branch = await prisma.branch.create({
          data: {
            name: name,
            phoneNo: phoneNo,
            latitude: latitude,
            longitude: longitude,
          },
        });

        return branch;
      }

      throw createGraphQLError("Unauthorized", 401);
    },
  },
};
