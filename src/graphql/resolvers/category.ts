import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { verifyToken_api } from "../../validation/token.validation";
import { photoUpload } from "../../helpers/cloudnary.photoUpload";
import { cloudinary } from "../../config/cloudnary.config";
import { PubSub } from "graphql-subscriptions";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../types/category.type";
import { isFeatured } from "../../types/enums";
// import { cloudinary } from "../../config/cloudnary.config";

const pubsub = new PubSub();

export default {
  Query: {
    getCategory: async (_: any, { id }: { id: string }, context: any) => {
      const category = await prisma.productCategory.findUnique({
        where: { id },
        include: {
          productTypes: true,
        },
      });

      return category;
    },
    getAllCategories: async (_: any, __: any, context: any) => {
      let allCategories = await prisma.productCategory.findMany({
        include: {
          productTypes: {
            include: {
              products: {
                include: {
                  image: true,
                  variant: {
                    include: {
                      ProductInventory: true,
                      AddToCart: {
                        where: { userId: "655379d96144626a275e8a14", isOrder:false },
                        include: { selectedVariant: true },
                      },
                    },
                  },
                  // AddToCart: { include: { user: true, selectedVariant: true } },
                },
              },
            },
          },
        },
      });
      //console.dir(allCategories[0], { depth: null });

      const categoriesWithDefaultRoutes = allCategories.map((category: any) => {
        const defaultProductType = category.productTypes[0]; // Grabbing the first product type for the default route
        return {
          ...category,
          defaultRoute: `/category/${category.name}/${category.id}/${defaultProductType?.id}`,
          productTypes: category.productTypes.map((productType: any) => ({
            ...productType,
            defaultRoute: `/category/${category.name}/${category.id}/${productType.id}`,
          })),
        };
      });

      return categoriesWithDefaultRoutes;
    },
    getCategoryWithProductTypes: async (
      _: any,
      { id, sliceCount }: { id: string; sliceCount?: number },
      context: any
    ) => {
      //console.log("slice", sliceCount);
      const category = await prisma.productCategory.findUnique({
        where: { id },
        include: {
          productTypes: {
            include: {
              products: {
                include: {
                  image: true,
                  variant: {
                    include: {
                      ProductInventory: true,
                      AddToCart: {
                        where: { userId: "655379d96144626a275e8a14", isOrder:false },
                        include: {
                          selectedVariant: true,
                          product: {
                            include: {
                              variant: { include: { ProductInventory: true } },
                            },
                          },
                        },
                      },
                    },
                  },

                  // AddToCart: { include: { user: true, selectedVariant: true } },
                },
              },
            },
          },
        },
      });

      if (category) {
        const products = category?.productTypes.flatMap(
          (productType) => productType.products
        );

        if (products) {
          let slicedProducts = products; // Default to all products

          if (sliceCount !== undefined && sliceCount > 0) {
            slicedProducts = products.slice(0, sliceCount); // Slice products based on sliceCount
          }

          let data = {
            id: category?.id,
            name: category?.name,
            image: category?.image,
            isActive: category?.isActive,
            products: slicedProducts, // Assign the sliced products to the 'products' field
          };

          return data;
        }
      } else {
        throw createGraphQLError(
          "Category not found for the specified CategoryId",
          500
        );
      }
    },
    getAllCategoryWithProductTypes: async (_: any, __: any, context: any) => {
      const category = await prisma.productCategory.findMany({
        include: {
          productTypes: {
            include: {
              products: {
                take: 1,
                include: {
                  image: true,
                  variant: {
                    include: {
                      AddToCart: {
                        where: { userId: "655379d96144626a275e8a14" },
                        include: { selectedVariant: true },
                      },
                    },
                  },
                  // AddToCart: { include: { user: true, selectedVariant: true } },
                },
              },
            },
          },
        },
      });

      let result = category.map((item: any) => {
        const products = item?.productTypes.flatMap(
          (productType: any) => productType.products
        );
        return {
          id: item?.id,
          name: item?.name,
          image: item?.image,
          isActive: item?.isActive,
          products,
        };
      });

      return result;
    },
  },
  Mutation: {
    createCategory: async (
      _: any,
      { input }: { input: CreateCategoryInput },
      context: any
    ) => {
      let status = await verifyToken_api(context.token);
      if (status && status?.res?.role.includes("admin")) {
        let imageUrl = await photoUpload(input.image);
        return await prisma.productCategory.create({
          data: {
            name: input.name,
            image: imageUrl,
          },
        });
      }
      throw createGraphQLError("Unauthorized", 401);
    },
    updateCategory: async (
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

          return await prisma.productCategory.update({
            where: { id },
            data: {
              name: input.name ?? existsData?.name,
              image: imageUrl.url ?? existsData?.image,
            },
          });
        }

        throw createGraphQLError("Category not found", 401);
      }

      throw createGraphQLError("Not authorized", 402);
    },
    deleteCategory: async (_: any, { id }: { id: string }, context: any) => {
      //   //console.log(id, "_____id222");
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

  // Subscription: {
  //   categoryProductType: {
  //     subscribe: () => pubsub.asyncIterator('CATEGORY_WITH_PRODUCTYPES'),
  //   },

  // },
};
