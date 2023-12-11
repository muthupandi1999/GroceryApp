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
} from "../../utils/common";
import { Address } from "../../types/address.type";

export default {
  Query: {
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
        // .then((res: any) => console.log(res.data))
        // .catch((err: any) => console.error(err));
        console.dir(response?.data, { depth: null });
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

        let OrderExists = await prisma.order.findFirst({
          where: {
            userId,
            orderStatus: "PENDING"
          },
        });

        if (OrderExists) {
          let updateOrder = await prisma.order.update({
            where: {
              id: OrderExists.id,
              userId,
              orderStatus: "PENDING"
            },
            data: {
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
          return {
            status: true,
            paymentType,
            message: "Order Successfully updated",
          };
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
            // updateAddToCart(addToCartId);
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
        console.log("🚀 ~ file: order.ts:84 ~ placeOrder: ~ e:", e);
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
      console.log("🚀 ~ file: server.js:48 ~ app.post ~ customer:", customerId);
<<<<<<< HEAD
      if (customerId) {
        const paymentIntent = await stripe.paymentIntents.create({
          customer: customerId,
          amount: amount * 100,
          currency: "inr",
          // capture_method: 'manual',
          // payment_method_data: {
          //   type: "card",
          //   card: {
          //     token: stripeToken,
          //   },
          // },
          automatic_payment_methods: {
            enabled: true,
            // allow_redirects: "never",
          },
          // confirm: true,
        });
        // console.log("🚀 ~ file: server.js:57 ~ app.post ~ paymentIntent:", paymentIntent)
        // const confirmedIntent = await stripe.paymentIntents.confirm(
        //   paymentIntent.id,
        //   { payment_method: paymentIntent.payment_method }
        // );
        // console.log(
        //   "🚀 ~ file: server.js:59 ~ app.post ~ confirmedIntent:",
        //   confirmedIntent
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
=======

      const paymentIntent = await stripe.paymentIntents.create({
        customer: customerId,
        amount: amount * 100,
        currency: "inr",
        capture_method: 'manual',
        payment_method_data: {
          type: "card",
          card: {
            token: stripeToken,
          },
        },
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        confirm: true,
      });
      // console.log("🚀 ~ file: server.js:57 ~ app.post ~ paymentIntent:", paymentIntent)
      const confirmedIntent = await stripe.paymentIntents.confirm(
        paymentIntent.id,
        {
          return_url: `http://localhost:3000/sucess/${paymentIntent.id}`,
        }
      );
      console.log(
        "🚀 ~ file: server.js:59 ~ app.post ~ confirmedIntent:",
        confirmedIntent
      );
      return {
        status: true,
        message: "Please authenticated to capture the amount",
        url: confirmedIntent?.next_action?.use_stripe_sdk?.stripe_js,
      };
>>>>>>> 76be7610fbc42d845eff3619a001d6d57b1c4616
    },
  },
};
