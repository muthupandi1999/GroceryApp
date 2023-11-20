import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { verifyToken_api } from "../../validation/token.validation";
import user from "./user";

export default {
  Query: {
    getAddToCartsByUserId: async (_: any, { userId }: any, context: any) => {

      let carts = await prisma.addToCart.findMany({
        where: {
          userId
        },
        include: {
          product: {include:{image:true}},
          user: true,
          selectedVariant: true,
        },
      });

      let totalPrice = carts.reduce((acc: number, cartItem: any) => {
        return acc + cartItem.totalPrice;
      }, 0);
      return {
        carts: carts,
        subTotal: totalPrice,
      };
    },
  },
  Mutation: {
    addToCartProduct: async (_: any, { input }: any, context: any) => {
      const { productId, quantity, userId, deviceToken, selectedVariantId } =
        input;
      let existAddToCart = await prisma.addToCart.findFirst({
        where: {
          productId: productId,
          selectedVariantId: selectedVariantId,
        },
        include: {
          selectedVariant: true,
        },
      });

      if (existAddToCart) {
        return await prisma.addToCart.update({
          where: { id: existAddToCart.id },
          data: {
            quantity: existAddToCart.quantity + quantity,
            totalPrice:
              existAddToCart.totalPrice! +
              existAddToCart.selectedVariant!.price * quantity,
          },
          include: {
            product: { include: { ProductType: true } },
            selectedVariant: true,
            user: true,
          }
        });
      } else {
        let productInfo = await prisma.products.findUnique({
          where: { id: productId },
          select: { variant: true },
        });
        console.log("productInfo", productInfo);

        const selectedVariant = productInfo?.variant.find(
          (e: any) => e.id === selectedVariantId
        );

        console.log(selectedVariant);

        if (productInfo && selectedVariant) {
          let addProductOnCart = await prisma.addToCart.create({
            data: {
              product: { connect: { id: productId } },
              quantity: quantity,
              totalPrice: selectedVariant.price * quantity,
              selectedVariant: { connect: { id: selectedVariant.id } },
              ...(userId ? { user: { connect: { id: userId } } } : {}),
              ...(deviceToken ? { deviceToken: deviceToken } : {}),
            },
            include: {
              product: { include: { ProductType: true ,image:true} },
              selectedVariant: true,
              user: true,
            },
          });

          console.log("4545", addProductOnCart);

          return addProductOnCart;
        }
      }

      // throw createGraphQLError("product not found", 404);
    },
    deleteCart: async (_: any, { cartId }: { cartId: string }) => {
      let deleteCart = await prisma.addToCart.delete({
        where: { id: cartId },
      });
      if (deleteCart) {
        return {
          message: "Cart deleted Successfully",
          data: deleteCart,
        };
      }
    },
    updateCarts: async (_: any, { input }: { input: any }) => {
      let updateCarts = await input.map(async (e: any) => {
        let variantFind = await prisma.variants.findUnique({
          where: { id: e.selectedVariantId },
        });
        let existAddToCart = await prisma.addToCart.findUnique({
          where: { id: e.id },
        });
        if (variantFind && existAddToCart) {
          await prisma.addToCart.update({
            where: {
              id: e.id,
            },
            data: {
              totalPrice: e.quantity * variantFind?.price,
              quantity: e.quantity,
            },
          });
        }
      });

      let changeAllData = await Promise.all(updateCarts);
      if (changeAllData) {
        return {
          message: "Carts updated successfully",
        };
      }
    },
  },
};
