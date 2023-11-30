import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { verifyToken_api } from "../../validation/token.validation";
import { photoUpload } from "../../helpers/cloudnary.photoUpload";
import { cloudinary } from "../../config/cloudnary.config";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../types/category.type";
import { sortBy } from "../../utils/common";

export default {
  Query: {
    getProductTypeId: async (_: any, { id, filter }: any, context: any) => {
      const productType = await prisma.productTypes.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              ProductType: true,
              image: true,
              variant: {
                orderBy: {
                  price: "asc",
                },
                include: {
                  ProductInventory: true,
                  AddToCart: { where: { userId: "65642fcb264c4f37a0b129be" } },
                },
              },
            },
          },
          productCategory: true,
        },
      });

      let sortedProducts: any = sortBy(filter, productType?.products);
      const productTypeWithSorted = {
        ...productType,
        products: sortedProducts,
      };
      return productTypeWithSorted;
    },
    getProductTypes: async (_: any, __: any, context: any) => {
      return await prisma.productTypes.findMany({
        include: {
          products: {
            include: {
              ProductType: true,
              image: true,
              variant: {
                orderBy: {
                  price: "asc",
                },
                include: {
                  ProductInventory: true,
                  AddToCart: { where: { userId: "65642fcb264c4f37a0b129be" } },
                },
              },
            },
          },
          productCategory: true,
        },
      });
    },
  },
  Mutation: {
    createProductType: async (
      _: any,
      { categoryId, input }: { categoryId: string; input: CreateCategoryInput },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      //   console.log(status, "_________status");
      //   if (status && status?.res?.role.includes("admin")) {
      let imageUrl = await photoUpload(input.image);
      return await prisma.productTypes.create({
        data: {
          name: input.name,
          image: imageUrl,
          productCategory: { connect: { id: categoryId } },
        },
        include: {
          productCategory: true,
        },
      });
      //   }
      //   throw createGraphQLError("Unauthorized", 401);
    },
    updateProductType: async (
      _: any,
      { id, input }: { id: string; input: UpdateCategoryInput },
      context: any
    ) => {
      let status = await verifyToken_api(context.token);
      if (status && status?.res?.role.includes("admin")) {
        let existsData = await prisma.productCategory.findUnique({
          where: { id },
        });
        if (existsData) {
          let imageUrl: string | any = input.image
            ? await photoUpload(input.image)
            : existsData.image;
          const publicId =
            RegExp(/\/v\d+\/(.*?)\./).exec(existsData.image)?.[1] || "";

          await cloudinary.uploader.destroy(publicId);

          return await prisma.productTypes.update({
            where: { id },
            data: {
              name: input.name ?? existsData?.name,
              image: imageUrl.url ?? existsData?.image,
            },
            include: {
              productCategory: true,
            },
          });
        }

        throw createGraphQLError("Category not found", 401);
      }

      throw createGraphQLError("Not authorized", 402);
    },
    deleteProductType: async (_: any, { id }: { id: string }, context: any) => {
      //   console.log(id, "_____id222");
      let status = await verifyToken_api(context.token);
      if (status && status?.res?.role.includes("admin")) {
        let deleteCategory = await prisma.productCategory.delete({
          where: { id },
        });
        if (deleteCategory) {
          return {
            message: "Category deleted Successfully",
            data: deleteCategory,
          };
        }
      }
      throw createGraphQLError("Error something wrong on delete category", 500);
    },
  },
};
