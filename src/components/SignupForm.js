import React, { useState } from 'react';
import axios from 'axios';
import Preferences from './Preferences';

const SignupForm = () => {
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
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data);

      const loginResponse = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const token = loginResponse.data.access_token;
      localStorage.setItem('token', token);

      setFormSubmitted(true);
      window.location.href = '/preferences';
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              {formSubmitted && <p className="text-success text-center">Signup successful! Please set your preferences.</p>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

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
                    <button type="submit" className="btn btn-danger">Sign Up</button>
                  </div>
                </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;


