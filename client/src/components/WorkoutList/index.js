import React from 'react';
import { Link } from 'react-router-dom';
import "../../index.css"

const WorkoutList = ({ workouts, title }) => {
  if (!workouts.length) {
    return <h3 id= '#form_box'>No Workouts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {workouts &&
       workouts.map(workout => (
          <div key={workout._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${workout.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {workout.username}
              </Link>{' '}
              Workout on {workout.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/workout/${workout._id}`}>
                <p>{workout.workoutBody}</p>
                <p className="mb-0">
                  Reactions: {workout.reactionCount} || Click to{' '}
                  {workout.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WorkoutList;
