import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import {
  createAddress,
  generateOrderId,
  updateAddToCart,
  updateProductInventory,
} from "../../utils/common";
import { Address } from "../../types/address.type";

export default {
  Mutation: {
    placeOrder: async (_: any, { input }: any, context: any) => {
      const {
        orderType,
        addToCartId,
        address,
        userId,
        couponId,
        paymentType,
        orderAmount,
      } = input;

      if (!address?.id) {
        address.id = await createAddress(address);
      }
      let orderId = await generateOrderId();
      let placeOrder = await prisma.order.create({
        data: {
          orderId: orderId,
          orderTime: new Date(),
          orderType: orderType,
          address: address
            ? {
              connect: { id: address.id },
            }
            : undefined,
          addToCart: {
            connect: addToCartId.map((id: string) => ({ id })),
          },
          coupon: couponId ? { connect: { id: couponId } } : undefined,
          user: { connect: { id: userId } },
          orderAmount: orderAmount,
          paymentType: paymentType,
        },
        include: {
          addToCart: true,
          coupon: true,
          user: true,
          address: true,
        },
      });

      if (placeOrder) {
        updateAddToCart(addToCartId);
        updateProductInventory(addToCartId);
        return { message: "Order Successfully" };
      }
      //   if (paymentType === "card") {
      //   }
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
              quantity: e.quantity
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
