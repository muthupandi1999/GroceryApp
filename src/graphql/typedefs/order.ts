export default `

enum OrderType {
    Takeaway
    Delivery
}

enum paymentMethod {
    CARD
    BANK
    CASH
}
  
enum paymentStatusType {
    Success
    Failed
    Pending
}

enum OrderStatus {
    PENDING
    CONFIRMED
    OUTFORDELIVERY
    DELIVERED
    CANCELLED
    RETURNED
    REJECTED
  }

type Order {
    id: String
    orderId: String
    orderTime: DateTime
    orderType: OrderType
    orderStatus:OrderStatus
    address: Address
    deliveryAddressId: String
    addToCart: [AddToCart]
    cartId: String
    user: User
    userId: String
    branch:Branch
    branchId:String
    coupon:Coupon
    couponId: String
    paymentStatus: paymentStatusType
    paymentType: paymentMethod
    orderAmount: Float
    orderDiscountPrice:Float
    totalOrderPrice:Float
}

input deliveryAddress {
    id: String
    address: String
    apartment: String
    label: Label
    pincode:Int

}

input placeOrderInput {
    orderType: OrderType!
    address: deliveryAddress!
    addToCartId: [String]!
    userId: String!
    couponId: String
    paymentType: paymentMethod!
    orderAmount: Float!
    branchId:String!
}

type placeOrderResponse {
    status :Boolean
    paymentType:String
    message:String
}
 
input cardPaymentInput {
    name:String
    email:String
    amount:Float
    currency:String

}

type cardPaymentResponse {
    status :Boolean
    message:String
    url:String
}

type cardPaymentResponse1 {
    clientSecret:String
}

type getEstimateDeliveryTimeResponse{
    From:String
    To:String
    EstimateTime:String
}

type Query{
    getOrder(orderId:String!):Order!
    getUserOrder(userId:String):[Order]
    getEstimateDeliveryTime(from:String!,to:String!):getEstimateDeliveryTimeResponse
}

type Mutation {
    placeOrder(input: placeOrderInput!):placeOrderResponse
    cardPayment(input:cardPaymentInput):cardPaymentResponse1
}
`;