import { Prisma } from "@prisma/client";
import GraphQLErrorHandling from "./graphql.error";

const handlePrismaError = (e: any, code:number): void => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      //console.log(
      //   "There is a unique constraint violation, a new user cannot be created with this email"
      // );
    }
    throw GraphQLErrorHandling(`${e?.meta?.message}`, code);
  }
  throw e;
};

export default handlePrismaError;
