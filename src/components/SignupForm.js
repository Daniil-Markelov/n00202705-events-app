import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

 
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/auth/register', formData);
      console.log(response.data);
      setFormSubmitted(true);
      

      history.push('/preferences');
    } catch (error) {
      console.error(error.response.data)
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {formSubmitted && <p>Signup successful! Please set your preferences.</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
