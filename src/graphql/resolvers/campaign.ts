import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { GraphQLError } from "graphql";
import { verifyToken_api } from "../../validation/token.validation";
import { DateTime } from "../../scalars/date";
import { DiscountType } from "../../types/enums";
import { JsonObject } from "../../scalars/json";
import campaign from "../typedefs/campaign";

type discountProductCampaign = {
  id: string;
  discount: number;
  discountType: DiscountType;
};
type CreateCampaignInput = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  products: discountProductCampaign[];
};

type UpdateCampaignInput = {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  image?: string;
  products?: discountProductCampaign[];
};

export default {
  Query: {
    getCampaignById: async (_: any, { id }: { id: string }, context: any) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status) {
      const Campaign = await prisma.campaign.findUnique({
        where: {
          id,
        },
        include: { products: true },
      });
      return Campaign;
      //   }
      //   throw new GraphQLError("Unauthorized", {
      //     extensions: {
      //       http: {
      //         status: 401,
      //       },
      //     },
      //   });
    },

    getAllCampaigns: async (
      _: any,
      {
        name,
        discountType,
        startDate,
        endDate,
        isActive,
      }: {
        name: string;
        discountType: DiscountType;
        startDate: Date;
        endDate: Date;
        isActive: boolean;
      },
      context: any
    ) => {
      // let status = await verifyToken_api(context.token);

      // if (!status) {
      //   throw createGraphQLError("Unauthorized", 401);
      // }

      let whereConditions: any = {
        ...(name ? { name: { contains: name } } : {}),

        ...(discountType ? { discountType: discountType } : {}),
        ...(startDate ? { startDate: { gte: startDate } } : {}),
        ...(endDate ? { endDate: { lte: endDate } } : {}),
        ...(isActive ? { isActive: isActive } : {}),
      };
      const Campaign = await prisma.campaign.findMany({
        where: whereConditions,
      });
      return Campaign;
    },
  },
  Mutation: {
    createCampaign: async (
      _: any,
      { input }: { input: CreateCampaignInput },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      const { products, ...restInput } = input;

      //   if (status && status?.res?.role.includes("admin")) {
      const updatesData = products.map(async (e: any) => {
        let updateProduct = await prisma.products.update({
          where: { id: e.id },
          data: {
            dicountPercentage: e.discount,
            discountType: e.discountType,
          },
        });
        return updateProduct;
      });

      let updateAllData = await Promise.all(updatesData);

      if (updateAllData) {
        const Campaign = await prisma.campaign.create({
          data: {
            name: restInput.name,
            description: restInput.description,
            startDate: new Date(restInput.startDate),
            endDate: new Date(restInput.endDate),
            image: restInput.image,
            createdAt: new Date(),
            products: {
              connect: updateAllData.map((product: any) => ({
                id: product.id,
              })),
            },
          },
          include: {
            products: true,
          },
        });

        return Campaign;
      }

      //   }
      //   throw createGraphQLError("Unauthorized", 401);
    },
    updateCampaignById: async (
      _: any,
      { id, input }: { id: string; input: UpdateCampaignInput },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      const { products, ...restInput } = input;

      const updatesData = products?.map(async (e: any) => {
        let updateProduct = await prisma.products.update({
          where: { id: e.id },
          data: {
            dicountPercentage: e.discount,
            discountType: e.discountType,
          },
        });
        return updateProduct;
      });
      if (updatesData) {
        let updateAllData = await Promise.all(updatesData);

        const campaign = await prisma.campaign.update({
          where: { id: id },
          data: {
            ...restInput,
            products: {
              connect: updateAllData.map((product: any) => ({
                id: product.id,
              })),
            },
          },
          include: {
            products: true,
          },
        });

        return campaign;
      }
    },
    deleteCampaignById: async (
      _: any,
      { id }: { id: string },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      let updateData = await prisma.products.updateMany({
        where: { campaignId: id },
        data: {
          discountType: null,
          dicountPercentage: 0,
        },
      });
      if (updateData) {
        return await prisma.campaign.delete({ where: { id } });
      }

      //   }
      //   throw createGraphQLError("Unauthorized", 401);
    },

    deleteCampaingnProduct: async (
      _: any,
      { campaignId, productId }: { campaignId: string; productId: string }
    ) => {
      let deleteProductCampaign = await prisma.products.update({
        where: { id: productId },
        data: {
          campaignId: {
            set: null,
          },
        },
      });

      if (deleteProductCampaign) {
        return "Product removed";
      }
    },
  },
};
