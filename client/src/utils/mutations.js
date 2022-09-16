import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout($workoutText: String!) {
    addWorkout(workoutText: $workoutText) {
      _id
      workoutText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($workoutId: ID!, $reactionBody: String!) {
    addReaction(workoutId: $workoutId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation addFollower($id: ID!) {
    addFollower(followerId: $id) {
      _id
      username
      followerCount
      followers {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation removeFollower($id: ID!) {
    removeFollower(id: $id) {
      _id
      username
      followers {
        _id
        username
      }
    }
  }
`;
