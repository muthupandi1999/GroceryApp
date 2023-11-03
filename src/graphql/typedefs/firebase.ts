export default `
  scalar JsonObject
  input notificationInput {
    title:String
    body:String
  }
  input sendPushNotificationToOne {
    token: String!
    notification: notificationInput
    data:JsonObject
  }
  input sendPushNotificationToMulti {
    token: [String]
    notification: notificationInput
    data:JsonObject
  }
  type Mutation {
    sendPushNotificationToOne(input:sendPushNotificationToOne):String
    sendPushNotificationToMulti(input:sendPushNotificationToMulti):String
  }
`