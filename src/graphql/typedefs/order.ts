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
    addCartId: AddToCart
    cartId: String
    user: User
    userId: String
    coupon:Coupon
    couponId: String
    paymentStatus: paymentStatusType
    paymentType: paymentMethod
    orderAmount: String
}

input placeOrderInput {

}

type placeOrderResponse {
    
}

type Mutation {
    placeOrder:( input: placeOrderInput!):placeOrderResponse
}
`;