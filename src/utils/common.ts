import { prisma } from "../config/prisma.config";
const stripe = require('stripe')('sk_test_51NjzQvSAjtfPsOjiGDrQ1QUxVwPTB8Tvc12f2l8Df0TKcc2e5j6wOcTxnMRl8x9bhIB5CFK8GrM5e4PdMhTijoxI00cORNXoOC')
import { Address, Label } from "../types/address.type";
import { v4 as uuidv4 } from "uuid";
import {
  sendPushNotificationToOne,
  sendPushNotificationToMulti,
} from "./sendPushNotification";

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
};

export const generateOrderId = async () => {
  let count = await prisma.order.count();
  let value = uuidv4();
  return `GRA${++count}-${value}`;
};

export const updateAddToCart = async (addToCart: any) => {
  let statusChange = await prisma.addToCart.updateMany({
    where: {
      id: { in: addToCart },
    },
    data: {
      isOrder: true,
    },
  });
};

export const updateProductInventory = async (addToCart: any) => {
  let products = await prisma.addToCart.findMany({
    where: {
      id: { in: addToCart },
    },
    include: {
      product: true,
      user: true,
      selectedVariant: true,
    },
  });

  products.forEach(async (item: any) => {
    let variantInfo = item?.selectedVariant;
    let productInfo = item?.product;
    let minusStock: number = minusStockFromInventory(
      variantInfo,
      item.quantity
    );
    console.log("🚀 ~ file: productInventory.ts:53 ~ minusStock:", minusStock);

    let productInventory = await prisma.productInventory.findFirst({
      where: {
        productId: productInfo?.id,
        variantId: variantInfo?.id,
      },
    });

    let updatedProductInventory = await prisma.productInventory.update({
      where: { id: productInventory?.id },
      data: {
        availableStock: productInventory!.availableStock - minusStock,
      },
    });

    //push notification for reach the minimum available stock
    pushNotificationMessage(updatedProductInventory);
  });
};

export const minusStockFromInventory = (variantInfo: any, stock: number) => {
  let unit = variantInfo.unit;
  let minusStock = 0;
  switch (unit) {
    case "gm":
      minusStock = (stock / 1000) * Number(variantInfo.values);
      break;
    case "ml":
      minusStock = (stock / 1000) * Number(variantInfo.values);
      break;
    default:
      minusStock = stock;
      break;
  }
  return minusStock;
};

const pushNotificationMessage = async (productInventory: any) => {
  if (
    productInventory &&
    productInventory?.availableStock <= productInventory?.minimumAvailableStock
  ) {
    console.log("vanakam da mapla push notification la erunthu");
    const notificationData = {
      data: {
        // Specify your data fields here
      },
      token:
        "cCJ0r_DDVPwygBCjPW1x-G:APA91bF4dQfBqmV6IN06O25-tO9qGCVTC1vfmAS10K_6RTxoS1kdAzBH8zSDYWTXAZw38AgywL1nky7tTTEGYE8S8tVBsLPXz8rcUzIwNBCCQyEhRhzy0FdMLTXfc6yGebX7sxH5Zl0X", // Replace with the actual device token
      notification: {
        title: "Reminder for minimum available stock",
        body: "Please reach out the  supplier to fill the stocks",
      },
    };

    await sendPushNotificationToOne(
      notificationData.data,
      notificationData.token,
      notificationData.notification
    );
  }
};

export const createStripeCustomer = async (name: string, email: string) => {
  let customer = await stripe.customers.create({
    name: name,
    email: email,
  })
  return customer.id
}

//tetststts