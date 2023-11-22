export default `
type Banner {
    id: String
    title:String!
    description:String!
    image:String!
    ProductType:ProductType
}

input createBannerInput{
    title:String!
    description:String!
    image:String!
    productTypeId:String!
}

type bannerDeleteResponse{
    status:Boolean
    message:String
}

input updateBannerInput{
    id:String!
    title:String
    description:String
    image:String
    productTypeId:String
}

type bannerUpdateResponse{
    status:Boolean
    message:String
    data:Banner
}
type Query {
    getAllBanner:[Banner]
}

type Mutation {
    createBanner( input:createBannerInput):Banner
    updateBanner(input:updateBannerInput):bannerUpdateResponse
    deleteBanner(bannerId:String):bannerDeleteResponse
}

`;

// type BannerProductType {
//     id: ID!
//     name: String!
//     image: String
//     isActive: Boolean
//     productCategory:Category
//     productCategoryId: String
//     products:[Products]
//   }