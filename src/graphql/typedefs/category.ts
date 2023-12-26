export default `

  type Category {
    id: ID!
    name: String!
    image: String
    isActive: Boolean
    productTypes:[ProductType]
    defaultRoute:String
  }

  type ProductTypeWithProducts {
    id: ID!
    name: String!
    image: String
    isActive: Boolean
    products:[Products]
  }

  enum Status {
    Active
    Inactive
  }

  input CreateCategoryInput {
    name: String!
    image: String
  }

  enum isFeatured{
    Yes
    No
  }

  type categoryStatus {
    message:String
    data:Category!
  }
  input UpdateCategoryInput {
    name: String
    image: String
  }

  type Query {
    getCategory(id: ID!): Category
    getCategoryWithProductTypes(id: ID!, sliceCount:Int): ProductTypeWithProducts
    getAllCategoryWithProductTypes:[ProductTypeWithProducts]
    getAllCategories: [Category]
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    deleteCategory(id: ID!): categoryStatus
  }

  type Subscription {
    categoryProductType: ProductTypeWithProducts
  }

  
`;
