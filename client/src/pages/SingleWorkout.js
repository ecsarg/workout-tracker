import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUT } from '../utils/queries';

const SingleWorkout = (props) => {
  const { id: workoutId } = useParams();

  const { loading, data } = useQuery(QUERY_WORKOUT, {
    variables: { id: workoutId },
  });

  const workout = data?.workout || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {workout.username}
          </span>{' '}
          Workout on {workout.createdAt}
        </p>
        <div className="card-body">
          <p>{workout.workoutText}</p>
        </div>
      </div>

      {workout.reactionCount > 0 && (
        <ReactionList reactions={workout.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm workoutId={workout._id} />}
    </div>
  );
};

export default SingleWorkout;
