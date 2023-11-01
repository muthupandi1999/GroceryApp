export default `
type Address {
    id: String
    address: String
    apartment: String
    label: Label
    user: User
    userId: String
    pincode:Int
}

 enum Label {
    Home
    Work
    Other
  }
  

  input AddressInput {
    address  :String
    apartment:String
    label    :Label
    pincode:Int
  }

`;

