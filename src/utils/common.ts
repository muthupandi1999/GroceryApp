import { prisma } from "../config/prisma.config";
const stripe = require("stripe")(
  "sk_test_51NjzQvSAjtfPsOjiGDrQ1QUxVwPTB8Tvc12f2l8Df0TKcc2e5j6wOcTxnMRl8x9bhIB5CFK8GrM5e4PdMhTijoxI00cORNXoOC"
);
import { Address, Label } from "../types/address.type";
import { v4 as uuidv4 } from "uuid";
import {
  sendPushNotificationToOne,
  sendPushNotificationToMulti,
} from "./sendPushNotification";
import transporter from "../services/mail.service";
import distance from "../config/map.config";

export const createAddress = async (input: Address, userId: string) => {
  const { address, apartment, label, pincode } = input;
  let createAddress = await prisma.address.create({
    data: {
      address,
      apartment,
      label,
      pincode,
      user: { connect: { id: userId } },
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
  addSellingCount(addToCart);
};

export const addSellingCount = async (addToCart: any) => {
  let carts = await prisma.addToCart.findMany({
    where: {
      id: { in: addToCart },
    },
    select: {
      productId: true,
      quantity: true,
    },
  });
  //console.log("🚀 ~ file: common.ts:53 ~ addSellingCount ~ carts:", carts);
  carts.forEach(async (item: any) => {
    await prisma.products.update({
      where: { id: item.productId },
      data: {
        sellingCount: {
          increment: item.quantity,
        },
      },
    });
  });
};

export const updateProductInventory = async (
  addToCart: any,
  branchId: string
) => {
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
    //console.log("🚀 ~ file: productInventory.ts:53 ~ minusStock:", minusStock);

    let productInventory = await prisma.productInventory.findFirst({
      where: {
        productId: productInfo?.id,
        variantId: variantInfo?.id,
        branchId: branchId,
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
    //console.log("vanakam da mapla push notification la erunthu");
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
  });
  return customer.id;
};

export const sendMail = async (email: string, otp: number) => {
  const mailConfigurations = {
    // It should be a string of sender/server email
    from: "mahespandi0321@gmail.com",
    to: email,
    // Subject of Email
    subject: "Email Verification",
    // This would be the text of email body
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
          /* FONTS */
          @media screen {
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              src: local('Lato Regular'), local('Lato-Regular'),
                url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                  format('woff');
            }
    
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 700;
              src: local('Lato Bold'), local('Lato-Bold'),
                url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                  format('woff');
            }
    
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 400;
              src: local('Lato Italic'), local('Lato-Italic'),
                url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                  format('woff');
            }
    
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 700;
              src: local('Lato Bold Italic'), local('Lato-BoldItalic'),
                url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                  format('woff');
            }
          }
    
          /* CLIENT-SPECIFIC STYLES */
          body,
          table,
          td,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          p {
            margin: 0;
          }
    
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
    
          img {
            -ms-interpolation-mode: bicubic;
          }
    
          /* RESET STYLES */
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }
    
          table {
            border-collapse: collapse !important;
          }
    
          body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
    
          a {
            color: #a1a1a1;
          }
          a:hover {
            color: #a1a1a1;
          }
          a:active {
            color: #a1a1a1;
          }
          a:visited {
            color: #a1a1a1;
          }
    
          /* iOS BLUE LINKS */
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
    
          /* ANDROID CENTER FIX */
          div[style*='margin: 16px 0'] {
            margin: 0 !important;
          }
        </style>
      </head>
    
      <body
        style="
          background-color: #ededed;
          margin: 0 !important;
          padding: 20px 0 !important;
        "
      >
        <table
          style="font-family: 'Lato'"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <tr>
            <td bgcolor="#ededed" align="center">
              <!-- 컨텐츠 영역 -->
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
              >
                <tr>
                  <td bgcolor="#f74658" align="center">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 540px"
                    >
                      <!-- 최상단 ENDAND 로고 -->
                      <tr>
                        <td style="padding: 24px 6px">
                          <a href="https://endand.com" target="_blank">
                            <img
                              alt="Logo"
                              src="https://s3cf.endand.com/assets/logo-white.png"
                              width="120"
                              border="0"
                              style="
                                display: block;
                                width: 120px;
                                max-width: 120px;
                                min-width: 120px;
                              "
                            />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#f74658">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 600px"
                    >
                      <tr>
                        <td align="center">
                          <img
                            alt="Logo"
                            src="https://s3cf.endand.com/assets/verification-email.png"
                            width="120"
                            border="0"
                            style="
                              display: block;
                              width: 120px;
                              max-width: 120px;
                              min-width: 120px;
                            "
                          />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    bgcolor="#f74658"
                    align="center"
                    style="
                      font-size: 36px;
                      font-weight: bold;
                      color: white;
                      padding: 14px 0 50px;
                    "
                  >
                   Verify your email address
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" align="center" style="padding: 28px 6px">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 540px"
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            color: #262626;
                            font-size: 20px;
                            font-weight: bold;
                            padding-bottom: 8px;
                          "
                        >
                          Just one more step...
                        </td>
                      </tr>
                      <tr align="center" style="color: #262626">
                        <td style="font-size: 14px">
                          Click the button below to activate your ENDAND account.
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 44px 0 60px; font-weight: bold"
                        >
                          <!-- ### 이메일 인증 URL -->
                          <h5>Your Password verification code</h5>
                          <h3>${otp}</h3>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr >
                
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`,
  };

  transporter.sendMail(mailConfigurations, (error: any, _info: any) => {
    if (error) throw Error(error);
  });
};

const getEstimateDelivery = async (branchId: string, destinationId: string) => {
  try {
    let branchInfo = await prisma.branch.findUnique({
      where: { id: branchId },
    });
    if (branchInfo) {
      let startPoint = `${branchInfo.latitude},${branchInfo.longitude}`;
      let endPoint = destinationId;
      let data = await distance.get({
        origin: startPoint,
        destination: endPoint,
      });
      return data?.duration;
    }
  } catch (e) {
    //console.log("🚀 ~ file: common.ts:455 ~ getEstimateDelviery ~ e:", e);
  }
};

const checkEstimateDelivery = async (destinationId: string) => {
  try {
    let branchInfo = await prisma.branch.findMany({});
    let result = branchInfo.map(async (item: any) => {
      let startPoint = `${item.latitude},${item.longitude}`;
      let endPoint = destinationId;
      let data = await distance.get({
        origin: startPoint,
        destination: endPoint,
      });
      return {
        branchId: item._id,
        duration: data?.duration,
      };
    });
    result.sort((a: any, b: any) => {
      const durationA = parseDuration(a.duration);
      const durationB = parseDuration(b.duration);
      return durationA - durationB;
    });
  
    return result[0];
  } catch (e) {
    //console.log("🚀 ~ file: common.ts:455 ~ getEstimateDelviery ~ e:", e);
  }
};

function parseDuration(durationString: string) {
  const regex = /(\d+(\.\d+)?) (\w+)/g;
  let match;
  let totalMinutes = 0;

  while ((match = regex.exec(durationString)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[3].toLowerCase();

    switch (unit) {
      case "hours":
        totalMinutes += value * 60;
        break;
      case "day":
      case "days":
        totalMinutes += value * 24 * 60; // Convert days to minutes
        break;
      case "mins":
        totalMinutes += value;
        break;
      default:
        // Handle unknown units
        break;
    }
  }

  return totalMinutes;
}

// export const sortBy = (filters: string, products: any): SortOptions => {
//   let sortedProducts: any;
//   switch (filters) {
//     case "Revelance":
//       return sortedProducts = products
//       break;
//     case "PriceHighToLow":
//       return sortedProducts = products?.sort((a: any, b: any) => b.variant[0]?.price - a.variant[0]?.price);
//       break;
//     case "PriceLowToHigh":
//       return sortedProducts = products?.sort((a: any, b: any) => a.variant[0]?.price - b.variant[0]?.price);
//       break;
//     case "AToZ":
//       return sortedProducts = products?.sort((a: any, b: any) => a.name > b.name ? 1 : -1);
//       break;
//     case "ZToA":
//       return sortedProducts = products?.sort((a: any, b: any) => a.name > b.name ? -1 : 1);
//       break;
//     default:
//       return sortedProducts = products
//   }
// }

export const sortBy = (filters: string, products: any) => {
  let sortedProducts: any;
  products = products.map((item: any) => {
    if (item.dicountPercentage) {
      item.variant[0].dicountPrice = Math.round(
        (item?.variant?.[0].price -
          (item?.variant?.[0].price * (item?.dicountPercentage / 100)))
      );
    } else {
      item.variant[0].dicountPrice = item.variant[0].price;
    }
    return item;
  });

  switch (filters) {
    case "Revelance":
      return (sortedProducts = products);

    case "PriceHighToLow":
      return (sortedProducts = products?.sort(
        (a: any, b: any) =>
          b.variant[0]?.dicountPrice - a.variant[0]?.dicountPrice
      ));

    case "PriceLowToHigh":
      return (sortedProducts = products?.sort(
        (a: any, b: any) =>
          a.variant[0]?.dicountPrice - b.variant[0]?.dicountPrice
      ));

    case "AToZ":
      return (sortedProducts = products?.sort((a: any, b: any) =>
        a.name > b.name ? 1 : -1
      ));

    case "ZToA":
      return (sortedProducts = products?.sort((a: any, b: any) =>
        a.name > b.name ? -1 : 1
      ));

    default:
      return (sortedProducts = products);
  }
};
