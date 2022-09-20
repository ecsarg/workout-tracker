import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <form id='form_box' class="border border-light p-5" onSubmit={handleFormSubmit}>
        <p className="h4 mb-4 text-center">Sign up</p>
        <input className="form-control"
                placeholder="Your Username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}/>

        <input className="form-control mb-4"
                placeholder="E-mail" 
                name="email"
                type="email"
                id="email"                        
                value={formState.email}
                onChange={handleChange}/>

        <input  className="form-control mb-4" 
                placeholder="Password" 
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}/>
        <small id="defaultRegisterFormPhoneHelpBlock" className="form-text text-muted mb-4">Minimal 8 characters length</small>
        <button className="btn btn-info my-4 btn-block" type="submit">Sign up</button>
        {error && <div>Signup failed</div>}
      </form>
      
    </main>
  );
};

export default Signup;
