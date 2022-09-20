import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'

const FollowerList = ({ followerCount, username, followers }) => {
  if (!followers || !followers.length) {
    return <p id='folower' className="alert alert-secondary text-center mb-4" role="alert">{username}, follow some new users!</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {followerCount} {followerCount === 1 ? 'follower' : 'followers'}
      </h5>
      {followers.map(follower => (
        <button className="btn btn-info btn-block my-4" key={follower._id}>
          <Link to={`/profile/${follower.username}`}>{follower.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FollowerList;
