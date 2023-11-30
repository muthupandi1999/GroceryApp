import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { verifyToken_api } from "../../validation/token.validation";
import { photoUpload } from "../../helpers/cloudnary.photoUpload";
import { cloudinary } from "../../config/cloudnary.config";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../../types/category.type";
import { isFeatured } from "../../types/enums";
import {
  CreateProductInput,
  UpdateProductInput,
  ProductImageAssets,
  ImageData,
} from "../../types/product.type";



export default {
  Query: {
    getProduct: async (_: any, { id }: { id: string }, context: any) => {
      let product = await prisma.products.findUnique({
        where: { id },
        include: {
          ProductType: true,
          variant: { include: { ProductInventory: true } },
          image: true,
        },
      });
      console.dir(product?.variant, { depth: null });
      return product;
    },
    getAllProducts: async (
      _: any,
      { filter }: { filter?: string },
      context: any
    ) => {
      // const pageSize = 5;
      // const pageNumber = 1;
      let allproducts = await prisma.products.findMany({
        where: {
          OR: [
            {
              name: {
                contains: filter ? filter : "",
                mode: "insensitive",
              },
            },
            // {
            //   shortDescription: {
            //     contains: filter ? filter : "",
            //     mode: "insensitive",
            //   },
            // },
          ],
        },
        include: {
          ProductType: true,
          variant: {
            include: {
              ProductInventory: true,
              AddToCart: {
                where: {
                  userId: "65642fcb264c4f37a0b129be",
                },
                include: {
                  selectedVariant: true,
                  product: { include: { variant: { include: { AddToCart: true } }, image: true } }
                }
              },
            },
          },
          image: true,
          ProductInventory: true,
          // AddToCart: { include: { user: true, selectedVariant: true } },
        },
        orderBy: {
          id: "desc",
        },
        // take: pageSize,
        // skip: (pageNumber - 1) * pageSize,
      });
      console.dir(allproducts[0], { depth: null });
      // pubsub.publish('PRODUCT_UPDATED', { productUpdated: allproducts });
      return allproducts;
    },
    getProductVariant: async (_: any, { id }: { id: string }) => {
      let variant = await prisma.variants.findUnique({
        where: { id },
        include: { product: true },
      });
      return variant;
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      {
        productTypeId,
        input,
      }: { productTypeId: string; input: CreateProductInput },
      context: any
    ) => {
      let status = await verifyToken_api(context.token);
      if (status && status?.res?.role.includes("admin")) {
        let image = (await photoUpload(input.image.image)) ?? "";
        let imageListPromises: Promise<string>[] = input.image.imageList.map(
          async (item: string) => {
            return (await photoUpload(item)) ?? "";
          }
        );

        let imageList: string[] = await Promise.all(imageListPromises);
        console.log("🚀 ~ file: product.ts:86 ~ imageList:", imageList);

        let units = input.variant?.map(async (e: any) => {
          let data = await prisma.variants.create({
            data: {
              unit: e.unit,
              price: e.price,
              values: e.values,
              size: e.size || undefined,
            },
          });

          return data; // Return the created unit data
        });

        const addOnResults: any = await Promise.all(units);

        let imageAssests = await prisma.productAssets.create({
          data: {
            image: image,
            imageList: imageList ?? [],
          },
        });

        console.log(addOnResults);

        return await prisma.products.create({
          data: {
            name: input.name,
            image: { connect: { id: imageAssests.id } },
            shortDescription: input.shortDescription,
            description: input.description,
            variant: { connect: addOnResults.map((e: any) => ({ id: e.id })) },
            tags: input.tagId ? { connect: { id: input.tagId } } : undefined,
            ProductType: { connect: { id: productTypeId } },
            ProductAssetsId: imageAssests.id,
            productCode: input.productCode,
            // branchId: branchId ? { connect: { id: input.branchId } } : undefined,
          },

          include: {
            ProductType: true,
            variant: true,
            image: true,
            tags: true,
          },
        });
      } else {
        throw createGraphQLError("Access Denied", 403);
      }
    },

    updateProduct: async (
      _: any,
      { id, input }: { id: string; input: UpdateProductInput },
      context: any
    ) => {
      // let status = await verifyToken_api(context.token);
      // if (status && status?.res?.role.includes("admin")) {
      let existingProduct = await prisma.products.findUnique({
        where: { id },
        include: {
          image: true,
          variant: true,
        },
      });

      const { image, units, tagId, ...restInput } = input;

      if (existingProduct) {
        let updateAssets: ProductImageAssets | undefined;
        if (image) {
          //   let updateAss = {
          //     ...image.front(front:await photoUpload(image.front))
          //   }

          //   // Update image fields if provided
          //   let imageFront = image.front
          //     ? await photoUpload(image.front)
          //     : existingProduct.image?.front;
          //   let imageBack = image.back
          //     ? await photoUpload(image.back)
          //     : existingProduct.image?.back;
          //   let imageleft = image.left
          //     ? await photoUpload(image.left)
          //     : existingProduct.image?.left;
          //   let imageRight = image.right
          //     ? await photoUpload(image.right)
          //     : existingProduct.image?.right;

          //   type ImageFields = keyof ImageData;
          //   // Destroy old cloudinary images
          //   for (const field of [
          //     "front",
          //     "back",
          //     "left",
          //     "right",
          //   ] as ImageFields[]) {
          //     if (image[field] && existingProduct.image) {
          //       const publicId = RegExp(/\/v\d+\/(.*?)\./).exec(
          //         existingProduct.image[field]
          //       )?.[1];
          //       if (publicId) {
          //         await cloudinary.uploader.destroy(publicId);
          //       }
          //     }
          //   }
          // const updatedImageData: Partial<ImageData> = {};

          // Loop through the image fields and update if a new image is provided
          // for (const field of ["front", "back", "left", "right"] as Array<
          //   keyof ImageData
          // >) {
          //   if (image[field]) {
          //     updatedImageData[field] = await photoUpload(image[field]);

          //     // Destroy old cloudinary images
          //     if (existingProduct.image && existingProduct.image[field]) {
          //       const publicId = RegExp(/\/v\d+\/(.*?)\./).exec(
          //         existingProduct.image[field]
          //       )?.[1];
          //       if (publicId) {
          //         await cloudinary.uploader.destroy(publicId);
          //       }
          //     }
          //   } else if (existingProduct.image) {
          //     // If no new image is provided, retain the existing image
          //     updatedImageData[field] = existingProduct.image[field];
          //   }
          // }

          // updateAssets = await prisma.productAssets.update({
          //   where: { id: existingProduct.ProductAssetsId },
          //   data: updatedImageData,
          // });

          //new
          let imageUpdate = image.image
            ? await photoUpload(image.image)
            : existingProduct.image?.image;
          let imageListPromises: Promise<string>[] = image.imageList.map(
            async (item: string) => {
              return (await photoUpload(item)) ?? "";
            }
          );
          let imageList: string[] = await Promise.all(imageListPromises);

          let updateAssets = await prisma.productAssets.update({
            where: { id: existingProduct.ProductAssetsId },
            data: {
              image: imageUpdate,
              imageList,
            },
          });
        }

        let updatedUnitData: any;
        if (units) {
          console.log("units");
          const updatedUnits = units.map(async (e: any) => {
            if (e.id) {
              // If the unit has an ID, it's an existing unit, so update it
              return prisma.variants.update({
                where: { id: e.id },
                data: {
                  unit: e.unit,
                  price: e.price,
                },
              });
            } else {
              // If the unit doesn't have an ID, it's a new unit, so create it
              return prisma.variants.create({
                data: {
                  unit: e.unit,
                  price: e.price,
                  productsId: id,
                  values: e.values,
                },
              });
            }
          });

          updatedUnitData = await Promise.all(updatedUnits);
        }

        // const updatedProduct = {
        //   ...(updateAssets || {}),
        //   ...(updatedUnitData || {}),

        //   ...restInput,
        // };

        // console.log(updatedProduct);
        let updatedProduct = await prisma.products.update({
          where: { id },
          data: {
            tags: input.tagId ? { connect: { id: input.tagId } } : undefined,
            ...restInput,
          },
          include: {
            ProductType: true,
            variant: {
              include: {
                ProductInventory: true,
                AddToCart: {
                  where: {
                    userId: "65642fcb264c4f37a0b129be",
                  },
                  include: {
                    selectedVariant: true,
                    product: { include: { variant: { include: { AddToCart: true } }, image: true } }
                  }
                },
              },
            },
            image: true,
            ProductInventory: true,
            // AddToCart: { include: { user: true, selectedVariant: true } },
          }
        });
        // subscriptionsProduct()
        return updatedProduct;
      }
      throw createGraphQLError("product not found", 404);
      // } else {
      //   throw createGraphQLError("Access Denied", 403);
      // }
    },

    deleteProduct: async (_: any, { id }: { id: string }, context: any) => {
      //   console.log(id, "_____id222");
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      let status = await verifyToken_api(context.token);
      if (status && status?.res?.role.includes("admin")) {
        let deleteProductExist = await prisma.products.findUnique({
          where: { id: id },
          include: {
            variant: true,
            image: true,
            ProductType: true,
          },
        });
        if (deleteProductExist) {
          let unitsIds = deleteProductExist.variant.map((e: { id: string }) => {
            return e.id;
          });
          if (unitsIds.length > 0) {
            await prisma.variants.deleteMany({
              where: {
                id: { in: unitsIds },
              },
            });
          }
          let imageId = deleteProductExist.image?.id;
          if (imageId) {
            await prisma.productAssets.delete({
              where: { id: imageId },
            });
          }

          await prisma.products.delete({
            where: { id },
          });

          return {
            message: "Product deleted successfully",
            data: deleteProductExist,
          };
        }
        throw createGraphQLError("Product not exist", 404);

        //   }
        //   throw createGraphQLError("Error something wrong on delete category", 500);
      } else {
        throw createGraphQLError("Access Denied", 403);
      }
    },
  },

};

// const subscriptionsProduct = async () => {
//   let allproducts = await prisma.products.findMany({
//     include: {
//       ProductType: true,
//       variant: {
//         include: {
//           ProductInventory: true,
//           AddToCart: {
//             where: {
//               userId: "65642fcb264c4f37a0b129be",
//             },
//             include: {
//               selectedVariant: true,
//               product: { include: { variant: { include: { AddToCart: true } }, image: true } }
//             }
//           },
//         },
//       },
//       image: true,
//       ProductInventory: true,
//     },
//     orderBy: {
//       id: "desc",
//     },
//   });
//   console.dir(allproducts[0], { depth: null });
 
// }