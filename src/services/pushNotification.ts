import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import { serviceAccount } from "../../src/services/service.account";

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


export const sendPushNotification = async (
    token: string,
    data: object,
    notification: object
  ) => {
    // Send a message to the device corresponding to the provided
    // registration token.
    const message = {
      data: { ...data },
      token,
      notification: { ...notification },
    };
    console.log(message);
    const res = await getMessaging().send(message);
    console.log(res);
    if (res) {
      return "Push ";
    }
    return false;
  };
  
  export const sendPushNotificationMulti = async (tokens, msg) => {
    const res = await getMessaging().sendMulticast({
      tokens,
      data: msg,
    });
    if (res) {
      return {
        successCount: res.successCount,
        failureCount: res.failureCount,
      };
    }
    return false;
  };