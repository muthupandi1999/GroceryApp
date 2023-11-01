import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";

export default {
  Mutation: {
    placeOrder: async (_: any, { input }: any, context: any) => {
      const {
        orderId,
        orderType,
        addToCartId,
        address,
        userId,
        couponId,
        paymentType,
        orderAmount,
      } = input;

      let createAddress: any;

      if (!address?.address.id) {
        createAddress = await prisma.address.create({
          data: {
            address: address.address,
            apartment: address.apartment,
            label: address.label,
            pincode: address.pincode,
          },
        });
      }

      if (couponId) {
        let coupon = await prisma.coupon.findUnique({
          where: { id: couponId },
        });
      }

      let placeOrder = await prisma.order.create({
        data: {
          orderId: orderId,
          orderTime: new Date(),
          orderType: orderType,

          address: address
            ? {
                connect: { id: address.id ? address.id : createAddress?.id },
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
      console.log("pasdfasdf", placeOrder);
      
      if(placeOrder){
        return "Order Successfully"
      }
      //   if (paymentType === "card") {
      //   }
    },
  },
};
