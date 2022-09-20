import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main>
      <form id='form_box' className='border border-light p-5' onSubmit={handleFormSubmit}>
        <p className="h4 mb-4 text-center">Sign in</p>
        <input type="email" 
        id="email" 
        name="email"
        className="form-control mb-4" 
        placeholder="E-mail" 
        value={formState.email} 
        onChange={handleChange}></input>
        <input type="password" 
        id="password" 
        className="form-control mb-4" 
        name="password"
        placeholder="Password" 
        value={formState.password}
        onChange={handleChange}></input>
        <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>
      </form>
      {error && <div>Login failed</div>}
    </main>
  );
};

export default Login;
