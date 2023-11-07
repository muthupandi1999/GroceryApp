export default `

    type SupplierProduct {
        id:ID!
        name:String!
        productCode:String!
        totalStock:Int
        availableStock:Int
        minimumAvailableStock:Int
    }

    input supplierProductInput {
        name:String!
        totalStock:Int!
        minimumAvailableStock:Int
        unit:Unit
    }

    input updateSupplierProductInput {
        name:String!
        totalStock:Int
        minimumAvailableStock:Int
    }

    type Query {
        getSupplierProductById(id:ID!): SupplierProduct
        getAllSupplierProducs: [SupplierProduct]
    }

    type Mutation {
        createSupplierProduct(input:supplierProductInput):SupplierProduct
        updateSupplierProduct(id:ID!, input:updateSupplierProductInput):SupplierProduct
        deleteSupplierProduct(id:ID):SupplierProduct
    }
`