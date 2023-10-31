import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { GraphQLError } from "graphql";
import { verifyToken_api } from "../../validation/token.validation";
import { DateTime } from "../../scalars/date";
import { DiscountType } from "../../types/enums";
type CreateCouponInput = {
  name: string;
  code: string;
  discount: number;
  discountType: "Fixed" | "Percentage";
  startDate: Date;
  endDate: Date;
  minimumOrderAmount: number;
  maximumDiscount: number;
  limitPerUser?: number;
  image: string;
  description: string;
};

type UpdateCouponInput = {
  name: string;
  code: string;
  discount: number;
  discountType: "Fixed" | "Percentage";
  startDate: Date;
  endDate: Date;
  minimumOrderAmount: number;
  maximumDiscount: number;
  limitPerUser?: number;
  image: string;
  description: string;
};

export default {
  Query: {
    getCouponById: async (_: any, { id }: { id: string }, context: any) => {
      let status = await verifyToken_api(context.token);
      if (status) {
        const coupon = await prisma.coupon.findUnique({
          where: {
            id,
          },
        });
        return coupon;
      }
      throw new GraphQLError("Unauthorized", {
        extensions: {
          http: {
            status: 401,
          },
        },
      });
    },

    getAllCoupons: async (
      _: any,
      {
        name,
        code,
        discount,
        discountType,
        startDate,
        endDate,
        minimumOrderAmount,
        maximumDiscount,
        limitPerUser,
      }: {
        name: string;
        code: string;
        discount: number;
        discountType: DiscountType;
        startDate: Date;
        endDate: Date;
        minimumOrderAmount: number;
        maximumDiscount: number;
        limitPerUser: number;
      },
      context: any
    ) => {
      // let status = await verifyToken_api(context.token);

      // if (!status) {
      //   throw createGraphQLError("Unauthorized", 401);
      // }

      let whereConditions: any = {
        ...(name ? { name: { contains: name } } : {}),
        ...(code ? { code: { contains: code } } : {}),
        ...(discount ? { discount: discount } : {}),
        ...(discountType ? { discountType: discountType } : {}),
        ...(startDate ? { startDate: { gte: startDate } } : {}),
        ...(endDate ? { endDate: { lte: endDate } } : {}),
        ...(minimumOrderAmount
          ? { minimumOrderAmount: { lte: minimumOrderAmount } }
          : {}),
        ...(maximumDiscount
          ? { maximumDiscount: { lte: maximumDiscount } }
          : {}),

        ...(limitPerUser ? { limitPerUser: { lte: limitPerUser } } : {}),
      };
      const coupons = await prisma.coupon.findMany({
        where: whereConditions,
      });
      return coupons;
    },
  },
  Mutation: {
    createCoupon: async (
      _: any,
      { input }: { input: CreateCouponInput },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      const promo = await prisma.coupon.create({
        data: input,
      });
      return promo;
      //   }
      //   throw createGraphQLError("Unauthorized", 401);
    },
    updateCouponById: async (
      _: any,
      { id, input }: { id: string; input: UpdateCouponInput },
      context: any
    ) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      return await prisma.coupon.update({ where: { id }, data: input });
      //   }

      //   throw createGraphQLError("Unauthorized", 401);
    },
    deleteCouponById: async (_: any, { id }: { id: string }, context: any) => {
      //   let status = await verifyToken_api(context.token);
      //   if (status && status?.res?.role.includes("admin")) {
      return await prisma.coupon.delete({ where: { id } });
      //   }
      //   throw createGraphQLError("Unauthorized", 401);
    },

    applyCouponByCode: async (
      _: any,
      { subTotal, code }: { subTotal: number; code: string },
      context: any
    ) => {
      let findCoupon = await prisma.coupon.findFirst({
        where: {
          code: code,
          isActive: true,
        },
      });

      if (!findCoupon) {
        throw createGraphQLError("Invalid coupon", 400);
      }

      if (subTotal < findCoupon.minimumOrderAmount) {
        throw createGraphQLError(
          `You should buy at least a minimum of ${findCoupon.minimumOrderAmount}`,
          400
        );
      }

      if (findCoupon.limitPerUser !== 0) {
        let CalculateTotalAmount:number;

        if (findCoupon.discountType === "Percentage") {
          CalculateTotalAmount =
            (findCoupon.discount / 100) * subTotal;
            
        } else {
          CalculateTotalAmount = findCoupon.discount;
        }

        if (CalculateTotalAmount < findCoupon.maximumDiscount) {
          return CalculateTotalAmount;
        } else {
          return findCoupon.maximumDiscount;
        }
      }

      throw createGraphQLError("Coupon expired", 403);
    },
  },
  DateTime,
};
