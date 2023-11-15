export default `

  type AddToCart {
    id: ID!
    product:Products
    productId:String
    quantity: Int!
    totalPrice: Float!
    user:User
    userId:String
    deviceToken: String
    isOrder: Boolean
    selectedVariantId:String
    selectedVariant:variants

  }

  input addToCartInput {
    productId:ID!
    selectedVariantId:String
    quantity: Int!
    totalPrice: Float!
    userId:String
    deviceToken: String
  }

  type addToCartStatus {
    message:String
    data:AddToCart
  }

  type userAddToCarts {
    carts:[AddToCart]
    subTotal:Float!
  }
 

  type Query {
    getAddToCartsByUserId(userId: ID!): userAddToCarts
    
  }
 
  input productInfo {
    id:ID!
    productId:String
    selectedVariantId: String
    quantity:Int
}

  type Mutation {
    addToCartProduct(input: addToCartInput!): AddToCart
    deleteCart(cartId:ID!):addToCartStatus
    updateCarts(input:[productInfo]):placeOrderResponse
  }
`;
