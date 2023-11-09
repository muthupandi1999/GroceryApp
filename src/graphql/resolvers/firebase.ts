import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { GraphQLError } from "graphql";
import { verifyToken_api } from "../../validation/token.validation";
import '../../config/firebase.config';
import { getMessaging } from "firebase-admin/messaging";
import { JsonObject } from "../../scalars/json";
import { notificationInput, sendPushNotificationToOne, sendPushNotificationToMulti } from '../../types/firebase.type';

export default {
  Mutation: {
    sendPushNotificationToOne: async (
      _: any,
      { input }: { input: sendPushNotificationToOne },
      context: any
    ) => {
      try {
        // You may want to add verification logic here if needed

        const { data, token, notification } = input;
        const message = {
          data: { ...data },
          token,
          notification: { ...notification },
          // apns: {
          //   payload: {
          //     aps: {
          //       'mutable-content': 1
          //     }
          //   },
          //   fcm_options: {
          //     image: 'https://foo.bar.pizza-monster.png'
          //   }
          // },
          // webpush: {
          //   headers: {
          //     image: 'https://foo.bar.pizza-monster.png'
          //   }
          // },



          
        };
        console.log("🚀 ~ file: firebase.ts:26 ~ message:", message)

        const res = await getMessaging().send(message);
        console.log("🚀 ~ file: firebase.ts:28 ~ res:", res)

        if (res) {
          return "Notification sent successfully";
        } else {
          throw createGraphQLError("Failed to send notification", 400);
        }
      } catch (error) {
        console.error("Error sending push notification:", error);
        throw createGraphQLError("Failed to send notification", 400);
      }
    },
    sendPushNotificationToMulti: async (
      _: any,
      { input }: { input: sendPushNotificationToMulti },
      context: any
    ) => {
      try {
        // You may want to add verification logic here if needed

        const { data, tokens, notification } = input;
        const message = {
          tokens,
          data: { ...data },
          notification: { ...notification },
        };

        const res = await getMessaging().sendMulticast(message);

        if (res) {
          return "Notification sent successfully";
        } else {
          throw createGraphQLError("Failed to send notification", 400);
        }
      } catch (error) {
        console.error("Error sending multicast push notification:", error);
        throw createGraphQLError("Failed to send notification", 400);
      }
    },
  },
  JsonObject
};


