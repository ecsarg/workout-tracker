import { gql } from '@apollo/client';

// all workouts
export const QUERY_WORKOUTS = gql`
  query workout($username: String) {
    workouts(username: $username) {
      _id
      workoutBody
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        createdAt
        username
        reactionBody
      }
    }
  }
`;

// one workout
export const QUERY_WORKOUT = gql`
  query workout($id: ID!) {
    workout(_id: $id) {
      _id
      workoutBody
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      followerCount
      followers {
        _id
        username
      }
      workouts {
        _id
        workoutBody
        createdAt
        reactionCount
      }
    }
  }
`;
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      followerCount
      workouts {
        _id
        workoutBody
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      followers {
        _id
        username
      }
    }
  }
`;
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      followerCount
      followers {
        _id
        username
      }
    }
  }
`;












