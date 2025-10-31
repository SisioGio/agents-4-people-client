import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../utils/AuthContext';
import apiClient from '../../../utils/apiClient';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [restaurant_id, setRestaurantId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('auth/login', { restaurant_id, password });
      const data = await response.data;
      const access_token = data['access_token'];
      const refreshToken = data['refreshToken'];

      

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refreshToken);
      login(access_token); // Set auth to true
      navigate('/restaurant/dashboard'); // Redirect to the desired page
    } catch (err) {
       // Check if err.response and err.response.data are defined
       setError(err?.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center  px-2 w-full">
    <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl shadow-xl space-y-8 bg-opacity-25">
      <h2 className="text-3xl font-bold text-center text-white">Login</h2>
  
      {error && <p className="text-red-500 text-center">{error}</p>}
  
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={restaurant_id}
            onChange={(e) => setRestaurantId(e.target.value)}
            defaultValue={'lab_3'}
            placeholder="Restaurant ID"
            default='lab_3'
            className="w-full p-4 bg-slate-800 bg-opacity-60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-slate-800 focus:bg-opacity-60 transition duration-200"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            default='test'
            className="w-full p-4 bg-slate-800 bg-opacity-60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-slate-800 focus:bg-opacity-60 transition duration-200"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-cyan-700 transition duration-200"
          >
            Login
          </button>
        </div>

        <span className='block text-sm text-red-400 py-3 text-center'>
          For the demo you can use 'lab_3' and password 'test'
        </span>
      </form>
  
      <div className="text-sm text-white text-center">
      
        <Link to="/request-password-reset" className="text-red-400 hover:text-red-300 block mt-2">
          I forgot my password
        </Link>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
