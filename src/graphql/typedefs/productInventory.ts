export default `
  type ProductInventory {
    id:ID
    productId:String!
    branchId:String!
    variantId:String!
    availableStock:Int!
    minimumAvailableStock:Int
  }
  input addProductInventoryInput{
    productId:String!
    branchId:String!
    variantId:String!
    availableStock:Int!
    minimumAvailableStock:Int
  }

  type addProductInventoryResponse{
    status:Boolean
    message:String
  }

  type Query {
    getProductInventoryById(productInventoryId:ID):ProductInventory
    getAllProductInventory:[ProductInventory]
  }

  type Mutation { 
    addProductInventory(input:addProductInventoryInput):addProductInventoryResponse
  }
`;
