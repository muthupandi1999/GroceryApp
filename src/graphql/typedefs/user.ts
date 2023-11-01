export default `
  type User{
    id: ID!
    email: String
    phoneNo: String
    firstName: String
    lastName: String
    role: [Role]
    profileImage: String
    isActive:Boolean
    address:[Address]
  }

  enum Role {
    admin
    user
    subAdmin
    deliveryBoy
  }

  input userUpdate {
    email: String
    firstName: String
    lastName: String
    phoneNo: String
    profileImage: String
  }

  type userLoginStatus {
    message:String
    accessToken: String
    refreshToken: String
    data: User
  }

  type userStatus {
    message:String
    data: User
  }

  type otpStatus {
    message: String
    otp:String!
  }

  input updateUserInput{
    firstName: String
    lastName: String
    profileImage: String
    address:AddressInput
  }

  type Mutation {
    loginViaEmail(email: String!): otpStatus
    loginViaPhone(phoneNo: String!):otpStatus
    loginEmailOtpValidation(email:String!, otp:String!):userLoginStatus
    loginPhoneNoOtpValidation(phoneNo:String!, otp:String!):userLoginStatus
    updateUserProfile(userId:ID!, input:updateUserInput):userStatus 
    updateEmail(email:String): otpStatus
    emailVerifyUpdate(userId:ID!,otp:String!, email:String!):userStatus
    updatePhoneNo(phoneNo:String): otpStatus
    phoneNoVerifyUpdate(userId:ID!,otp:String!, phoneNo:String!):userStatus
    accessTokenGenerate(refreshToken: String!): String!


    
  }

  type Query {
    getUserById(userId:ID!):User
    getUsers:[User]
  }
`;
