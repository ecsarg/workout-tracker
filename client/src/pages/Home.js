import React from 'react';
import WorkoutList from '../components/WorkoutList';
import WorkoutForm from '../components/WorkoutForm';
import FollowerList from '../components/FollowerList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS, QUERY_ME_BASIC } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const workouts = data?.workouts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <WorkoutForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WorkoutList
              workouts={workouts}
              title="Some Feed for Workout(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FollowerList
              username={userData.me.username}
              followerCount={userData.me.followerCount}
              followers={userData.me.followers}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
