const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        followerCount: Int
        workouts: [Workout]
        followers: [User]
    }

    type Workout {
        _id: ID
        workoutBody: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        username: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String): User
        workouts(username: String): [Workout]
        workout(_id: ID!): Workout
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addWorkout(workoutBody: String!): Workout
        addReaction(workoutId: ID!, reactionBody: String!): Workout
        addFollower(followerId: ID!): User
    }
`;

module.exports = typeDefs;