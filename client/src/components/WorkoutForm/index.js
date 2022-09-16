import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_WORKOUT } from '../../utils/mutations';
import { QUERY_WORKOUTS, QUERY_ME } from '../../utils/queries';

const WorkoutForm = () => {
  const [workoutText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
    update(cache, { data: { addWorkout } }) {
      
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, workouts: [...me.workouts, addWorkout] } },
        });
      } catch (e) {
        console.warn("First workout insertion by user!")
      }

      // update thought array's cache
      const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });
      cache.writeQuery({
        query: QUERY_WORKOUTS,
        data: { workout: [addWorkout, ...workouts] },
      });
    }
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addWorkout({
        variables: { workoutText },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's my latest workout!"
          value={workoutText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;

