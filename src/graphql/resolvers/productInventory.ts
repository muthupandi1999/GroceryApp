import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";

interface productInventory {
    productId: string,
    branchId: string,
    variantId: string,
    count: number
}

export default {
    Query: {},
    Mutation: {
        addProductInventory: async (
            _: any,
            { input }: { input: productInventory },
        ) => {
            const { productId, branchId, variantId, count } = input
            let createProductInventory = await prisma.productInventory.create({
                data: {
                    count:count,
                    product: { connect: { id: productId } } ,
                    branch: { connect: { id: branchId } } ,
                    variant: { connect: { id: variantId } } ,
                }
            })

            if (createProductInventory) {
                return {
                    status: true,
                    message: 'product inventory successfully added'
                }
            }
        },
    },
};