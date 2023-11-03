import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { GraphQLError } from "graphql";
import { verifyToken_api } from "../../validation/token.validation";

import admin from "firebase-admin";

import { getMessaging } from "firebase-admin/messaging";
import { serviceAccount } from "../../services/service.account";
import { JsonObject } from "../../scalars/json";

const serviceAccountKey = {
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  private_key_id: serviceAccount.private_key_id,
  client_id: serviceAccount.client_id,
  auth_uri: serviceAccount.auth_uri,
  token_uri: serviceAccount.token_uri,
  auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

type notificationInput = {
  title: string;
  body: string;
};

type sendPushNotificationToOne = {
  token: string;
  notification: notificationInput;
  data: any;
};

type sendPushNotificationToMulti = {
  tokens: string[];
  notification: notificationInput;
  data: any;
};

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
        };

        const res = await getMessaging().send(message);

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


