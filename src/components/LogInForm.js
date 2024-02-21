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
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      console.log(response.data);
      setFormSubmitted(true);

      window.location.href = '/';
    } catch (error) {
      if (error.response) {

        console.error(error.response.data);
      } else {

        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              {formSubmitted && <p className="text-success text-center">Login successful! Redirecting...</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-danger">Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

