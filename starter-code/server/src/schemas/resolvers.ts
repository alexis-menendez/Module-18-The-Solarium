// Module-18-The-Solarium/server/src/schemas/resolvers.ts

import { User } from '../models/User.js';
import { signToken } from '../services/auth.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('Not logged in');
      }

      const userData = await User.findById(context.user._id).select('-__v -password');
      return userData;
    },
  },

  Mutation: {
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError('Incorrect credentials');
      }

      const validPw = await user.isCorrectPassword(password);
      if (!validPw) {
        throw new GraphQLError('Incorrect credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (
      _parent: any,
      { username, email, password }: { username: string; email: string; password: string }
    ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) {
        throw new GraphQLError('You need to be logged in!');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    removeBook: async (_parent: any, { bookId }: { bookId: string }, context: any) => {
      if (!context.user) {
        throw new GraphQLError('You need to be logged in!');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};
