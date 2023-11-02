export default `

  enum Unit {
    gm
    kg
    pcs
    ml
    ltr
    pack
    each
  }

  type productDetails {
    key: String
    value: String
  }

  input productDetailsInput{
    key: String
    value: String
  }

  type variants {
    id:ID!
    size:String
    unit: Unit!
    values: String
    price: Float!
    stock: Int!
  }

  type productImageAssets {
    id:ID
    front:String
    back:String
    left:String
    right:String
  }

  input productImageAssetsInput {
    front:String
    back:String
    left:String
    right:String
  }



  input variantInput {
    unit: Unit
    size:String
    values: String
    price: Float
    stock: Int
  }

  input variantUpdateInput {
    id : ID
    unit: Unit
    size:String
    values: String
    price: Float
    stock: Int
  }

  type Products {
    id: ID!
    name: String!
    shortDescription: String
    description: [productDetails]
    variant : [variants]
    tag:String
    image : productImageAssets
    rating:Float
    ratingCount :Int            
    isActive: Boolean
    ProductType:ProductType           
    productTypeId: String
    branch:Branch
    branchId:String
  }

  input CreateProductInput {
    name: String!
    image: productImageAssetsInput
    shortDescription: String
    description: [productDetailsInput!]
    tag:String
    variant: [variantInput!]
    branchId:String!
  }

  type productStatus {
    message:String
    data:Products!
  }
  input UpdateProductInput {
    name: String
    image: productImageAssetsInput
    variant: [variantUpdateInput]
    shortDescription: String
    tag:String
    description: [productDetailsInput!]
  }

  type Query {
    getProduct(id: ID!): Products
    getAllProducts(filter:String): [Products]
  }

  type Mutation {
    createProduct(productTypeId: String!, input: CreateProductInput!): Products
    updateProduct(id: ID!, input: UpdateProductInput!): Products
    deleteProduct(id: ID!): productStatus  
  }

`;
