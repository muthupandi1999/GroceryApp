import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { GraphQLError } from "graphql";
import { verifyToken_api } from "../../validation/token.validation";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
type createAdminInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default {
  Mutation: {
    createAdmin: async (_: any, { input }: { input: createAdminInput }) => {
      let hashPassword = await hash(input.password, 10);
      let createAdmin = await prisma.admin.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashPassword,
          confirmPassword: hashPassword,
        },
      });

      return createAdmin;
    },

    adminLogin: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      let findAdmin = await prisma.admin.findFirst({
        where: {
          email: email,
        },
      });
      if (findAdmin) {
        let comparePass = await compare(password, findAdmin?.password);
        if (comparePass) {
          let accessToken = sign(
            { id: findAdmin.id, email: findAdmin.email, role: findAdmin.role },
            "secret",
            {
              expiresIn: "1h",
            }
          );

          let refreshToken = sign(
            { id: findAdmin.id, email: findAdmin.email, role: findAdmin.role },
            "secret",
            { expiresIn: "1d" }
          );

          return {
            message: "Login successfully",
            accessToken: accessToken,
            refreshToken: refreshToken,
            data: findAdmin,
          };
        }
      }

      throw createGraphQLError("Invalid Username and password", 403);
    },
  },
};
