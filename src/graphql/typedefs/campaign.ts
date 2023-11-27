export default `
  scalar DateTime
  type Campaign {
    id: ID!
    name: String!
    description: String
    startDate: DateTime!
    endDate: DateTime!
    image: String!
    isActive: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    products:[Products]
  }
  
  enum DiscountType {
    Fixed
    Percentage
  }

  input campaignDiscountProduct {
    id:ID
    discount:Float
    discountType:DiscountType

  }
  
  input CreateCampaignInput {
    name: String!
    description: String
    startDate: String!
    endDate: String!
    image: String!
    products:[campaignDiscountProduct]
  }
  
  input UpdateCampaignInput {
    name: String
    description: String
    startDate: String
    endDate: String
    image: String
    products:[campaignDiscountProduct]
  }

  type Query {
    getCampaignById(id: ID!): Campaign
    getAllCampaigns(name:String, discountType: DiscountType,  startDate : String,endDate : String): [Campaign]
  }
  
  type Mutation {
    createCampaign(input: CreateCampaignInput!): Campaign!
    updateCampaignById(id: ID!, input: UpdateCampaignInput!): Campaign!
    deleteCampaignById(id: ID!): Campaign!
    deleteCampaingnProduct(productId:ID, campaignId:ID):String!
  }

`;
