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
            let productInfo = await prisma.products.findUnique({where:{id:productId},select:{productCode:true}})
            let variantInfo = await prisma.variants.findUnique({where:{id:variantId}})
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

            if (createProductInventory && productInfo) {
                let unitChanges = variantInfo?.unit;
                let unitValue = variantInfo?.values
                let minusStock:any;
               
                if(unitChanges === "gm"){
                    minusStock = (stock / 2)
                }else{
                    minusStock = stock
                }

                let supplierProductInventory = await prisma.supplierProductInventory.findFirst({
                    where:{
                        productCode:productInfo.productCode
                    }
                })
                await prisma.supplierProductInventory.update({
                    where:{productCode:productInfo.productCode},
                    data:{
                        availableStock: supplierProductInventory!.availableStock - minusStock
                    }
                })
                return {
                    status: true,
                    message: 'product inventory successfully added'
                }
            }
        },
    },
};