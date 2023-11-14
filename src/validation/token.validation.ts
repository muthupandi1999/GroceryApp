import { verify } from "jsonwebtoken";
import createGraphQLError from "../errors/graphql.error";

type LoginResponse = {
  success: boolean;
  token?: string;
  error?: string;
  res?: any;
};

export const verifyToken_api = (
  accessToken: string | undefined
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    if (!accessToken) {
      throw createGraphQLError("Auth token is not supplied", 401);
    } else {
      let token: string;
      const authenticationScheme = 'Bearer ';
      if (accessToken.startsWith(authenticationScheme)) {
        token = accessToken.slice(authenticationScheme.length, accessToken.length);
      } else {
        token = accessToken;
      }
      // const token = accessToken.slice(6, accessToken.length).trim();
      verify(token, "secret", (err: Error | null, res: any) => {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true, token, res });
        }
      });
    }
  });
};
