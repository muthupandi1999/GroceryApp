import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";

export default {
    Mutation: {
        placeOrder: async (_: any, { input }: any, context: any) => {
            const {
                orderType,
                cartId,
                address,
                userId,
                couponId,
                paymentType,
                orderAmount
            } = input;

            if (paymentType === 'card') {

            }

        },
    }
}