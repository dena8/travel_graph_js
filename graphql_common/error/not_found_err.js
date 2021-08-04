const { ApolloError } = require("apollo-server-core");

module.exports = class NotFoundErr extends ApolloError {
  constructor(message) {
    super(message, 404);

    Object.defineProperty(this, "name", { value: "Not Found" });
  }
};
