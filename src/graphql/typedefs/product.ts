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
    stock: Int
    ProductInventory:[ProductInventory]
    AddToCart:AddToCart
    product:Products
  }

  type productImageAssets {
    id:ID
    image:String
    imageList:[String]
  }

  input productImageAssetsInput {
    image:String
    imageList:[String]
  }



  input variantInput {
    unit: Unit
    size:String
    values: String
    price: Float
  }

  input variantUpdateInput {
    id : ID
    unit: Unit
    size:String
    values: String
    price: Float
  }

  type Products {
    id: ID!
    name: String!
    productCode:String!
    shortDescription: String
    description: [productDetails]
    variant : [variants]
    tag:String
    image : productImageAssets
    rating:Float
    dicountType:DiscountType
    dicountPercentage: Float
    ratingCount :Int            
    isActive: Boolean
    ProductType:ProductType           
    productTypeId: String
   
  }

  input CreateProductInput {
    name: String!
    productCode:String!
    image: productImageAssetsInput
    shortDescription: String
    description: [productDetailsInput!]
    tag:String
    variant: [variantInput!]
  }

  type productStatus {
    message:String
    data:Products!
  }
  input UpdateProductInput {
    name: String
    productCode:String
    image: productImageAssetsInput
    variant: [variantUpdateInput]
    shortDescription: String
    tag:String
    description: [productDetailsInput!]
  }

  type Query {
    getProduct(id: ID!): Products
    getAllProducts(filter:String): [Products]
    getProductVariant(id:ID!):variants
  }

  type Mutation {
    createProduct(productTypeId: String!, input: CreateProductInput!): Products
    updateProduct(id: ID!, input: UpdateProductInput!): Products
    deleteProduct(id: ID!): productStatus  
  }

  type Subscription {
    productUpdated: [Products]
  }

`;
