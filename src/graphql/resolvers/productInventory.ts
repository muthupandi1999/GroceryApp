import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { productInventory } from '../../types/productInventory.type';
import { minusStockFromInventory } from '../../utils/common';

export default {
    Query: {},
    Mutation: {
        addProductInventory: async (
            _: any,
            { input }: { input: productInventory },
        ) => {
            try {
                const { productId, branchId, variantId, stock, minimumAvailableStock } = input;

                //Check prodcut inventory already exists or not
                const exitsProductInventory = await prisma.productInventory.findFirst({
                    where: {
                        productId,
                        branchId,
                        variantId,
                    }
                })
                if (exitsProductInventory) {
                    return {
                        status: false,
                        message: 'Product inventory already exists'
                    }
                }

                //If not exists create produc inventory
                let createProductInventory = await prisma.productInventory.create({
                    data: {
                        stock: stock,
                        availableStock: stock,
                        minimumAvailableStock: minimumAvailableStock,
                        product: { connect: { id: productId } },
                        branch: { connect: { id: branchId } },
                        variant: { connect: { id: variantId } },
                    },
                    include: {
                        product: true,
                        variant: true,
                        branch: true
                    }
                })

                if (createProductInventory && createProductInventory?.product && createProductInventory?.variant) {
                    let variantInfo = createProductInventory?.variant;
                    let productInfo = createProductInventory?.product;
                    let minusStock: number = minusStockFromInventory(variantInfo, stock);
                    console.log("🚀 ~ file: productInventory.ts:53 ~ minusStock:", minusStock)

                    let supplierProductInventory = await prisma.supplierProductInventory.findFirst({
                        where: {
                            productCode: productInfo.productCode
                        }
                    })

                    await prisma.supplierProductInventory.update({
                        where: { productCode: productInfo.productCode },
                        data: {
                            availableStock: supplierProductInventory!.availableStock - minusStock
                        }
                    })
                    return {
                        status: true,
                        message: 'product inventory successfully added'
                    }
                }
            } catch (e) {
                return {
                    status: false,
                    message: 'Something went wrong !'
                }
            }
        },
    },
};

