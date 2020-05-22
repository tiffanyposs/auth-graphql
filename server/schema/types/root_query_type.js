import { GraphQLObjectType, GraphQLID } from 'graphql';
import UserType from './user_type';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // {
    //   user {
    //     email
    //   }
    // }
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        // passport returns a truthy value
        // if user is logged in and null
        // when a user is not logged in
        return req.user;
      },
    },
  },
});

export default RootQueryType;
