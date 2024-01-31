import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ history }) => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost/auth/login', formData);
      console.log(response.data);
      setFormSubmitted(true);
      
      history.push('/');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {formSubmitted && <p>Login successful! Redirecting...</p>}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
