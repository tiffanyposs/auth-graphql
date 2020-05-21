const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;
const UserType = require('./types/user_type');
const AuthService  = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Signup
    // mutation {
    //   signup(email: "test@test.com", password: "password") {
    //     email
    //   }
    // }
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        // request is the request context from express
        return AuthService.signup({ email, password, req });
      },
    },

    // Log Out
    // mutation {
    //   logout {
    //     email
    //   }
    // }
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        return AuthService.logout(req);
      },
    },

    // Log In
    // mutation {
    //   login(email: "test@test.com", password: "password") {
    //     email
    //   }
    // }
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
  },


});

module.exports = mutation;
