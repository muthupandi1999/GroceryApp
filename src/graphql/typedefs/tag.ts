export default `
  type Tag {
    id: ID!
    name: String!
    products: [Products]
  }
 
  type Query {
    getTagById(id: ID!): Tag
    getAllTags:[Tag]
  }
  
  type Mutation {
    createTag(name: String!): Tag!
    updateTag(id: ID!, name: String!): Tag!
    deleteTagId(id: ID!): Tag!

  }
  
`;
