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


