import { GraphQLError, GraphQLErrorOptions } from "graphql";
const createGraphQLError = (
  message: string,
  status: number
): GraphQLError => {
  const errorOptions: GraphQLErrorOptions = {
    extensions: {
      http: {
        status,
      },
    },
  };
  const error: GraphQLError = new GraphQLError(message, errorOptions);
  throw error;
};
export default createGraphQLError;
