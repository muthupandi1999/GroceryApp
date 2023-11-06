export default `
  type addProductInventoryInput{
    productId:String!
    branchId:String!
    variantId:String!
    count:Int!
  }

  type addProductInventoryResponse{
    status:Boolean
    message:String
  }

  type Mutation { 
    addProductInventory(input:addProductInventoryInput):addProductInventoryResponse
  }
`;
