export default `

  type ProductType {
    id: ID!
    name: String!
    image: String
    isActive: Boolean
    defaultRoute:String
    productCategory:Category           
    productCategoryId: String
    products:[Products]
  }

  input CreateProductTypeInput {
    name: String!
    image: String
   
  }

  enum isFeatured{
    Yes
    No
  }

  type productTypeStatus {
    message:String
    data:ProductType!
  }
  input UpdateProductTypeInput {
    name: String
    image: String
  }

  enum SortProducts {
    Revelance
    PriceHighToLow
    PriceLowToHigh
    AToZ
    ZToA
  }

  type Query {
    getProductTypeId(id: ID!,filter:SortProducts): ProductType
    getProductTypes: [ProductType]
  }

  type Mutation {
    createProductType(categoryId: String!, input: CreateProductTypeInput!): ProductType
    updateProductType(id: ID!, input: UpdateProductTypeInput!): ProductType
    deleteProductType(id: ID!): productTypeStatus  
  }
`;
