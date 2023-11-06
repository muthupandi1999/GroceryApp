export type notificationInput = {
  title: string;
  body: string;
};

export type sendPushNotificationToOne = {
  token: string;
  notification: notificationInput;
  data: any;
};

export type sendPushNotificationToMulti = {
  tokens: [string];
  notification: notificationInput;
  data: any;
};
