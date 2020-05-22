import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import UserType from './types/user_type';
import AuthService  from '../services/auth';

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

export default mutation;
