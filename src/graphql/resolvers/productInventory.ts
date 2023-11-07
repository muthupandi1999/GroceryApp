import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";

interface productInventory {
    productId: string,
    branchId: string,
    variantId: string,
    stock: number
    minimumAvailableStock:number
}

export default {
    Query: {},
    Mutation: {
        addProductInventory: async (
            _: any,
            { input }: { input: productInventory },
        ) => {
            const { productId, branchId, variantId, stock, minimumAvailableStock } = input
            let createProductInventory = await prisma.productInventory.create({
                data: {
                    stock:stock,
                    availableStock:stock,
                    minimumAvailableStock:minimumAvailableStock,
                    product: { connect: { id: productId } } ,
                    branch: { connect: { id: branchId } } ,
                    variant: { connect: { id: variantId } } ,
                },
                include:{
                    product:true,
                    variant:true,
                    branch:true
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