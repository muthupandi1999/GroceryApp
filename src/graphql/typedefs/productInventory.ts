export default `
  input addProductInventoryInput{
    productId:String!
    branchId:String!
    variantId:String!
    stock:Int!
    minimumAvailableStock:Int
  }

  type addProductInventoryResponse{
    status:Boolean
    message:String
  }

  type Mutation { 
    addProductInventory(input:addProductInventoryInput):addProductInventoryResponse
  }
`;
