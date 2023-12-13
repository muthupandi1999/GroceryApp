export default `
  type ProductInventory {
    id:ID
    productId:String!
    branchId:String!
    variantId:String!
    availableStock:Float!
    minimumAvailableStock:Float
  }
  input addProductInventoryInput{
    productId:String!
    branchId:String!
    variantId:String!
    availableStock:Float!
    minimumAvailableStock:Float
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
