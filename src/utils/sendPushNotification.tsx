import { getMessaging } from "firebase-admin/messaging";
import createGraphQLError from '../errors/graphql.error'; // Replace with your actual error handling logic
import '../../config/firebase.config';
async function sendPushNotificationToOne(data, token, notification) {
  try {
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
}

async function sendPushNotificationToMulti(data, tokens, notification) {
  try {
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
}

export { sendPushNotificationToOne, sendPushNotificationToMulti };