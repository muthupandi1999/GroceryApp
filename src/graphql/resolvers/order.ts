import { prisma } from "../../config/prisma.config";
import axios from "axios";
import moment from 'moment';
import {
  allOrdersFunctions
} from '../../services/order.service';
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
    getAllOrder: async (_: any, { index, limit }: { index: number, limit: number }) => {
      let matchQuery: any = {
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
      }
      let count = await prisma.order.findMany(matchQuery);
      if (index != null && limit != null) {
        let take = limit;
        let skip = (index - 1) * limit;
        matchQuery["take"] = take;
        matchQuery["skip"] = skip;
      }
      let order = await prisma.order.findMany(matchQuery);
      return {
        count: count.length,
        data: order
      };
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
    getMonthlyChart: async (_: any, { days }: { days: number }) => {
      const currentDate = moment();
      const sevenDaysAgo = currentDate.clone().subtract(days, 'days').startOf('day');
      let check = await prisma.order.groupBy({
        where: {
          orderTime: {
            gte: sevenDaysAgo.toDate(),
            lte: currentDate.toDate(),
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
      const transformedResult = check.map(item => ({
        orderAmount: item._sum.orderAmount,
        orderDate: moment(item.orderDate).format('MMMDD'),
      }));
      const DaysArr = Array.from({ length: days }, (_, index) =>
        currentDate.clone().subtract(index, 'days').format('MMMDD')
      ).reverse();
      let amount: number[] = [];
      for (let i = 0; i < DaysArr.length; i++) {
        const searchObject = transformedResult.find((item) => item.orderDate == DaysArr[i]);
        if (searchObject != undefined) {
          amount.push(searchObject && searchObject?.orderAmount || 0)
        } else {
          amount.push(0)
        }
      }
      let sum = 0;
      for (let index = 0; index < amount.length; index++) {
        sum += amount[index];
      }
      return {
        date: DaysArr,
        amount: amount,
        total: sum
      }
    },
    getOrdersChart: async (_: any) => {
      const currentDate = moment();
      const sevenDaysAgo = currentDate.clone().subtract(30, 'days').startOf('day');
      let check = await prisma.order.groupBy({
        where: {
          orderTime: {
            gte: sevenDaysAgo.toDate(),
            lte: currentDate.toDate(),
          },
        },
        by: ['orderDate'],
        _count: {
          _all: true,
        },
        orderBy: {
          orderDate: 'desc',
        },
      })
      const transformedResult = check.map(item => ({
        count: item._count._all,
        date: moment(item.orderDate).format('MMMDD'),
      }));
      const DaysArr = Array.from({ length: 30 }, (_, index) =>
        currentDate.clone().subtract(index, 'days').format('MMMDD')
      ).reverse();

      let count: number[] = [];
      for (let i = 0; i < DaysArr.length; i++) {
        const searchObject = transformedResult.find((item) => item.date == DaysArr[i]);
        if (searchObject != undefined) {
          count.push(searchObject && searchObject?.count || 0)
        } else {
          count.push(0)
        }
      }
      let sum = 0;
      for (let index = 0; index < count.length; index++) {
        sum += count[index];
      }
      return {
        date: DaysArr,
        count: count,
        total: sum
      }
    },
    getSaleThisMonthChart: async (_: any, { days }: { days: number }) => {
      const currentDate = moment();
      const startOfMonth = moment().clone().startOf('month')
      let check = await prisma.order.groupBy({
        where: {
          orderTime: {
            gte: startOfMonth.toDate(),
            lte: currentDate.toDate(),
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
      const transformedResult = check.map(item => ({
        orderAmount: item._sum.orderAmount,
        orderDate: moment(item.orderDate).format('MMMDD'),
      }));
      const endOfMonth = moment().clone().endOf('month')
      const daysDifference = endOfMonth.diff(startOfMonth, 'days');
      const DaysArr = Array.from({ length: daysDifference + 1 }, (_, index) =>
        startOfMonth.clone().add(index, 'days').format('MMMDD')
      );
      let amount: number[] = [];
      for (let i = 0; i < DaysArr.length; i++) {
        const searchObject = transformedResult.find((item) => item.orderDate == DaysArr[i]);
        if (searchObject != undefined) {
          amount.push(searchObject && searchObject?.orderAmount || 0)
        } else {
          amount.push(0)
        }
      }
      let sum = 0;
      for (let index = 0; index < amount.length; index++) {
        sum += amount[index];
      }
      return {
        date: DaysArr,
        amount: amount,
        total: sum
      }
    },
    getOrderDetailsCount: async (_: any) => {
      const results = await Promise.all(allOrdersFunctions.map(func => func()));
      return results
    }
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


