import { prisma } from "../config/prisma.config";
import { Address, Label } from "../types/address.type";
import { v4 as uuidv4 } from "uuid";

export const createAddress = async (input: Address) => {
    const { address, apartment, label, pincode } = input;
    let createAddress = await prisma.address.create({
        data: {
            address,
            apartment,
            label,
            pincode,
        },
    });
    return createAddress.id;
}

export const generateOrderId = async () => {
    let count = await prisma.order.count();
    let value = uuidv4();
    return `GRA${++count}-${value}`
}

export const updateAddToCart = async (addToCart: any) => {
    let statusChange = await prisma.addToCart.updateMany({
        where: {
            id: { in: addToCart },
        },
        data: {
            isOrder: true,
        },
    });
}

export const updateProductInventory = async (addToCart: any) => {
    let products = await prisma.addToCart.findMany({
        where: {
            id: { in: addToCart },
        },
        include: {
            product: true,
            user: true,
            selectedVariant: true
        },
    });
    products.map(async (item) => {
        let variantInfo = item?.selectedVariant;
        let productInfo = item?.product;
        let minusStock: number = minusStockFromInventory(variantInfo, item.quantity);
        console.log("🚀 ~ file: productInventory.ts:53 ~ minusStock:", minusStock)

        let productInventory = await prisma.productInventory.findFirst({
            where: {
                productId: productInfo?.id,
                variantId: variantInfo?.id
            }
        })

        await prisma.productInventory.update({
            where: { id: productInventory?.id },
            data: {
                availableStock: productInventory!.availableStock - minusStock
            }
        })
    })
}

export const minusStockFromInventory = (variantInfo: any, stock: number) => {
    let unit = variantInfo.unit;
    let minusStock = 0;
    switch (unit) {
        case 'gm':
            minusStock = stock / 1000 * Number(variantInfo.values);
            break;
        case 'ml':
            minusStock = stock / 1000 * Number(variantInfo.values);
            break;
        default:
            minusStock = stock;
            break
    }
    return minusStock;
}