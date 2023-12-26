import { prisma } from "../../config/prisma.config";
import axios from "axios";
const stripe = require("stripe")(
  "sk_test_51NjzQvSAjtfPsOjiGDrQ1QUxVwPTB8Tvc12f2l8Df0TKcc2e5j6wOcTxnMRl8x9bhIB5CFK8GrM5e4PdMhTijoxI00cORNXoOC"
);
import createGraphQLError from "../../errors/graphql.error";
import {
  createAddress,
  generateOrderId,
  updateAddToCart,
  updateProductInventory,
  createStripeCustomer,
  formatDate
} from "../../utils/common";
import { Address } from "../../types/address.type";

export default {
  Query: {
    getAllOrder: async (_: any) => {
      let order = await prisma.order.findMany({
        include: {
          addToCart: { include: { product: { include: { image: true } }, selectedVariant: true, } },
          coupon: true,
          user: true,
          address: true,
          branch: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - 30));
      priorDate.setHours(0, 0, 0, 0);
      let check = await prisma.order.groupBy({
        where: {
          orderTime: {
            gte: priorDate,
          },
        },
        by: ['orderDate'],
        _sum: {
          orderAmount: true,
        },
        orderBy: {
          orderDate: 'desc',
        },
      })
      console.log("🚀 ~ file: order.ts:41 ~ getAllOrder: ~ check:", check)
      return order;
    },
    getOrder: async (_: any, { orderId }: { orderId: string }) => {
      let order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          addToCart: { include: { product: { include: { image: true } }, selectedVariant: true, } },
          coupon: true,
          user: true,
          address: true,
          branch: true,
        },
      });
      let totalDiscount = 0, orderPrice = 0;
      if (order) {
        let cartData = order.addToCart;
        for (let i = 0; i < cartData.length; i++) {
          if (
            cartData[i] &&
            cartData[i].selectedVariant
          ) {
            //total dicount price calculation
            let discountAmount =
              cartData[i].quantity *
              (cartData[i].selectedVariant?.price ?? 0) *
              ((cartData[i].product?.dicountPercentage ?? 0) / 100);
            totalDiscount += discountAmount

            //total order price calculation
            let orderAmount =
              cartData[i].quantity *
              (cartData[i].selectedVariant?.price ?? 0)
            orderPrice += orderAmount

          }
        }
      }
      let result = { orderDiscountPrice: totalDiscount, totalOrderPrice: orderPrice, ...order }
      return result;
    },
    getUserOrder: async (_: any, { userId }: any, context: any) => {
      let userOrders = await prisma.order.findMany({
        where: {
          userId,
        },
        include: {
          addToCart: true,
          coupon: true,
          user: true,
          address: true,
          branch: true,
        },
      });

      return userOrders;
    },
    getEstimateDeliveryTime: async (
      _: any,
      { from, to }: any,
      context: any
    ) => {
      try {
        let key = "DriPTWkcnSzZzp1k2AkwDd3aLNfrvhPR";
        const fromLat = 9.9483648;
        const fromLng = 78.1451264;
        const toLat = 9.9489;
        const toLng = 78.0976;
        let url = `https://www.mapquestapi.com/directions/v2/route?key=${key}&from=${from}&to=${to}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`;
        // let url = `https://www.mapquestapi.com/directions/v2/route?key=${key}&from=${fromLat},${fromLng}&to=${toLat},${toLng}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`
        let response: any = await axios.get(url);
        // .then((res: any) => //console.log(res.data))
        // .catch((err: any) => console.error(err));
        //console.dir(response?.data, { depth: null });
        return {
          From: from,
          To: to,
          EstimateTime: response?.data?.route?.formattedTime,
        };
      } catch (e) {
        return "something went wrong";
      }
    },
  },
  Mutation: {
    placeOrder: async (_: any, { input }: any, context: any) => {
      try {
        const {
          orderType,
          addToCartId,
          address,
          userId,
          couponId,
          paymentType,
          orderAmount,
          branchId,
        } = input;

        if (!address?.id) {
          address.id = await createAddress(address, userId);
        }
        let orderId = await generateOrderId();
        let pendingOrder = await prisma.order.count({
          where: {
            orderStatus: "PENDING",
          },
        });
        if (pendingOrder <= 50) {
          let placeOrder = await prisma.order.create({
            data: {
              orderId: orderId,
              orderTime: new Date(),
              orderDate: formatDate(new Date()),
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
              branch: { connect: { id: branchId } },
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
            // updateProductInventory(addToCartId, branchId);
            return {
              status: true,
              paymentType,
              message: "Order Successfully",
            };
          }
        } else {
          return {
            status: false,
            paymentType,
            message:
              "Please place order after some time currently so many orders are processing right now",
          };
        }
      } catch (e) {
        console.log("🚀 ~ file: order.ts:194 ~ placeOrder: ~ e:", e)
        return {
          status: false,
          paymentType: "ERROR",
          message: "Something went wrong",
        };
      }
    },
    cardPayment: async (_: any, { input }: { input: any }) => {
      const { name, email, amount } = input;

      let customerId = createStripeCustomer(name, email);
      if (customerId) {
        const paymentIntent = await stripe.paymentIntents.create({
          customer: customerId,
          amount: amount * 100,
          currency: "inr",

          // payment_method_data: {
          //   type: "card",

          // },
          // automatic_payment_methods: {
          //   enabled: true,
          //   allow_redirects: "never",
          // },
          // confirm: true,
        });
        // const confirmedIntent = await stripe.paymentIntents.confirm(
        //   paymentIntent.id,
        //   { payment_method: paymentIntent.payment_method }
        // );
        // return {
        //   status: true,
        //   message: "Please authenticated to capture the amount",
        //   url: confirmedIntent?.next_action?.use_stripe_sdk?.stripe_js,
        // };

        return {
          clientSecret: paymentIntent?.client_secret,
        };
      }
    },
  },
};
