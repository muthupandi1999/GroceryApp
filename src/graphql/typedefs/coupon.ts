export default `
  scalar DateTime
  type Coupon {
    id: ID!
    name: String!
    code: String!
    discount: Float!
    discountType: DiscountType!
    startDate: DateTime!
    endDate: DateTime!
    minimumOrderAmount: Float 
    maximumDiscount: Float
    limitPerUser: Int
    description: String
    isActive: Boolean
  }
  
  enum DiscountType {
    Fixed
    Percentage
  }
  
  input CreateCouponInput {
    name: String!
    code: String!
    discount: Float!
    discountType: DiscountType!
    startDate: String!
    endDate: String!
    minimumOrderAmount: Float
    maximumDiscount: Float
    limitPerUser: Int
    description: String
  }
  
  input UpdateCouponInput {
    name: String
    code: String!
    discount: Float
    discountType: DiscountType
    startDate: String
    endDate: String
    minimumOrderAmount: Float
    maximumDiscount: Float
    limitPerUser: Int
    description: String
    isActive: Boolean
  }

  type Query {
    getCouponById(id: ID!): Coupon
    getAllCoupons(name:String, code: String,discount:Float, discountType: DiscountType,  startDate : String,endDate : String,minimumOrderAmount: Float,
      maximumDiscount: Float,
      limitPerUser: Int): [Coupon!]!
  }
  
  type Mutation {
    createCoupon(input: CreateCouponInput!): Coupon!
    updateCouponById(id: ID!, input: UpdateCouponInput!): Coupon!
    deleteCouponById(id: ID!): Coupon!
    applyCouponByCode(code:String!, subTotal:Float, ):Float
  }
  
`;
