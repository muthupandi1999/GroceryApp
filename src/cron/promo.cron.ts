import { prisma } from "../config/prisma.config";

import cron from "node-cron";

// Define a cron job to run daily at midnight
export const promoExpiery = cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();

    // Find all active promo codes with endDate in the past
    const expiredPromoCodes = await prisma.coupon.findMany({
      where: {
        isActive: true,
        endDate: {
          lt: currentDate,
        },
      },
    });

    // const expiredOffers = await prisma.offer.findMany({
    //   where: {
    //     status: "Active",
    //     endDate: {
    //       lt: currentDate,
    //     },
    //   },
    // });

    // Mark expired promo codes as inactive
    await Promise.all(
      expiredPromoCodes.map(async (promoCode) => {
        await prisma.coupon.update({
          where: {
            id: promoCode.id,
          },
          data: {
            isActive: false,
          },
        });
      })
    );


    
    // await Promise.all(
    //   expiredOffers.map(async (offer) => {
    //     await prisma.offer.update({
    //       where: {
    //         id: offer.id,
    //       },
    //       data: {
    //         status: "Inactive",
    //       },
    //     });
    //   })
    // );

    //console.log(`Expired promo codes disabled: ${expiredPromoCodes.length}`);
  } catch (error) {
    console.error("Error occurred during promo code expiration check:", error);
  }
});

// Start the cron job
