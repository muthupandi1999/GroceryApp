export default `

    type SupplierProduct {
        id:ID!
        productCode:String!
        totalStock:Int
        availableStock:Int
        mimimumAvailableStock:Int
    }

    input supplierProductInput {
        name:String!
        totalStock:Int!
        mimimumAvailableStock:Int
        unit:Unit
    }

    input updateSupplierProductInput {
        name:String!
        totalStock:Int
        mimimumAvailableStock:Int
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