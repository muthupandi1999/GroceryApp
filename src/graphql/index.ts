import path from "path";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";



const typedefsArray = loadFilesSync([
  path.join(__filename, "../typedefs/user.ts"),
  path.join(__filename, "../typedefs/category.ts"),
  path.join(__filename, "../typedefs/productType.ts"),
  path.join(__filename, "../typedefs/product.ts"),
  path.join(__filename, "../typedefs/addToCart.ts"),
  path.join(__filename, "../typedefs/coupon.ts"),
  path.join(__filename, "../typedefs/admin.ts"),
  path.join(__filename, "../typedefs/branch.ts"),
  path.join(__filename, "../typedefs/address.ts"),
  path.join(__filename, "../typedefs/order.ts"),
  path.join(__filename, "../typedefs/tag.ts"),
  path.join(__filename, "../typedefs/firebase.ts"),
  path.join(__filename, "../typedefs/supplierProduct.ts"),
  path.join(__filename, "../typedefs/productInventory.ts"),
  // path.join(__filename, "../typedefs/administrators.ts"),

]);

const resolversArray = loadFilesSync([
  path.join(__dirname, "./resolvers/user.ts"),
  path.join(__dirname, "./resolvers/category.ts"),
  path.join(__dirname, "./resolvers/productType.ts"),
  path.join(__dirname, "./resolvers/product.ts"),
  path.join(__dirname, "./resolvers/addToCart.ts"),
  path.join(__dirname, "./resolvers/coupon.ts"),
  path.join(__dirname, "./resolvers/admin.ts"),
  path.join(__dirname, "./resolvers/branch.ts"),
  path.join(__dirname, "./resolvers/order.ts"),
  path.join(__dirname, "./resolvers/tag.ts"),
  path.join(__dirname, "./resolvers/firebase.ts"),
  path.join(__dirname, "./resolvers/supplierProduct.ts"),
  path.join(__dirname, "./resolvers/productInventory.ts"),
  
  //  path.join(__dirname, "./resolvers/chartAddition.ts"),
  // path.join(__dirname, "./resolvers/administrators.ts"),

]);

export const typeDefs = mergeTypeDefs(typedefsArray);
export const resolvers = mergeResolvers(resolversArray);
