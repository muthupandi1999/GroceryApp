export default `
    type Admin {
        id: ID!
        name: String
        email:String
        password: String
        confirmPassword: String
        role:[Role]
    }

    input createAdmin {
        name: String
        email:String
        password: String
        confirmPassword: String
    }

    type adminLoginStatus {
        message: String
        accessToken: String
        refreshToken: String
        data: Admin
    }

    type Mutation {
        createAdmin(input:createAdmin!): Admin
        adminLogin(email:String, password:String):adminLoginStatus
    }

   
`;
