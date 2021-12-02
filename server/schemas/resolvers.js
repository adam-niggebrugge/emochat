const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models/userModel');


const resolvers = {
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        }, 
    }
}

module.exports = resolvers;