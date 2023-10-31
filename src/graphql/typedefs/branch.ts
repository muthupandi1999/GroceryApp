export default `
    type Branch {
        id: ID!
        name: String!
        phoneNo: String
        latitude: String!
        longitude: String!
        products:[Products]
    }

    input createBranch {
        name: String!
        phoneNo: String
        latitude: String!
        longitude: String!
    }

    type Query {
        getBranch(branchId:ID!): Branch!
        getAllBranchs: [Branch]
    }

    type Mutation {
        createBranch(input:createBranch): Branch!
    }
`;
