import { GraphQLScalarType, Kind } from 'graphql';
export const JsonObject = {
  ObjectArray: {
    parseValue(value: string) {
      try {
        return JSON.parse(value);
      } catch (error) {
        throw new Error("Invalid ObjectArray: Could not parse JSON.");
      }
    },

    serialize(value: any) {
      try {
        return JSON.stringify(value);
      } catch (error) {
        throw new Error("Invalid ObjectArray: Could not stringify JSON.");
      }
    },

    parseLiteral(ast: { kind: any; value: string }) {
      if (ast.kind === Kind.STRING) {
        try {
          return JSON.parse(ast.value);
        } catch (error) {
          throw new Error("Invalid ObjectArray: Could not parse AST literal.");
        }
      }
      throw new Error("Invalid ObjectArray: AST literal must be a string.");
    },
  },
};
