export default `

enum OrderType {
    Placed
    Delivered
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

type Order {
    id: String
    orderId: String
    orderTime: DateTime
    orderType: OrderType
    address: Address
    deliveryAddressId: String
    addToCart: [AddToCart]
    cartId: String
    user: User
    userId: String
    coupon:Coupon
    couponId: String
    paymentStatus: paymentStatusType
    paymentType: paymentMethod
    orderAmount: Float
}

input deliveryAddress {
    id: String
    address: String
    apartment: String
    label: Label
    pincode:Int

}

input placeOrderInput {
    orderId: String
    orderType: OrderType
    address: deliveryAddress
    addToCartId: [String]
    userId: String
    couponId: String
    paymentStatus: paymentStatusType
    paymentType: paymentMethod
    orderAmount: Float
}

type placeOrderResponse {
    message:String
}

type Mutation {
    placeOrder(input: placeOrderInput!):placeOrderResponse
}
`;