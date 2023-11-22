import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { createSupplierProduct } from "../../types/supplierProducts.type";
import { verifyToken_api } from "../../validation/token.validation";

export default {
  Query: {
    getAllSupplierProducs: async () => {
      // const pageSize = 5;
      // const pageNumber = 1;
      let allSupplierProducts = await prisma.supplierProductInventory.findMany({
        // take: pageSize,
        // skip: (pageNumber - 1) * pageSize,
      });
      return allSupplierProducts;
    }
  },
  Mutation: {
    createSupplierProduct: async (
      _: any,
      { input }: { input: createSupplierProduct }
    ) => {
      const latestProduct = await prisma.supplierProductInventory.findFirst({
        orderBy: { productCode: "desc" },
      });

      let newProductCode = "GRP0001"; // Default value if no previous codes exist

      if (latestProduct) {
        // Extract the numeric part and increment it
        const numericPart =
          parseInt(latestProduct.productCode.slice(3), 10) + 1;

        // Format the new product code with leading zeros
        newProductCode = `GRP${String(numericPart).padStart(4, "0")}`;
      }

      const supplierProduct = await prisma.supplierProductInventory.create({
        data: {
          name: input.name,
          productCode: newProductCode,
          totalStock: input.totalStock,
          availableStock: input.totalStock,
          minimumAvailableStock: input.minimumAvailableStock,
          unit: input.unit,
          // Add other data as needed
        },
      });

      return supplierProduct;
    },
  },
};
