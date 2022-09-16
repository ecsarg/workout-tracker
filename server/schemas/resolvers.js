const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('workouts')
                    .populate('following');

                return userData;
            }

            throw new AuthenticationError('You must be logged in!');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('workouts')
                .populate('followers');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('followers')
                .populate('workouts');
        },
        workouts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Workout.find(params).sort({ createdAt: -1 });
        },
        workout: async (parent, { _id }) => {
            return Workout.findOne({ _id });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addWorkout: async (parent, args, context) => {
            if (context.user) {
                const workout = await Workout.create({ ...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { workouts: workout._id } },
                    { new: true }
                );

                return workout;
            }

            throw new AuthenticationError('You must be logged in!');
        },
        addReaction: async (parent, { workoutId, reactionBody }, context) => {
            if (context.user) {
                const updatedWorkout = await Workout.findOneAndUpdate(
                    { _id: workoutId },
                    { $push: { reactions: { reactionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );
                
                return updatedWorkout;
            }

            throw new AuthenticationError('You must be logged in!');
        },
        addFollower: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { followers: followId } },
                    { new: true }
                ).populate('followers');
            }

            throw new AuthenticationError('You must be logged in!');
        }
    }
};

module.exports = resolvers;