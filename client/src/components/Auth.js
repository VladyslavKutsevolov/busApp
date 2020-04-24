import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import Message from './Form/Message';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
  const {
    request,
    loading,
    error,
    clearError,
    message,
    clearMessage,
    setMessage,
  } = useHttp();
  const { login, logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    clearError();
    clearMessage();
  }, [error, clearError, message, clearMessage]);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {
        ...form,
      });
      setMessage(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {
        ...form,
      });
      login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-2/3">
          <Message message={message} error={error} />
        </div>
      </div>
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="w-2/3">
          <h1 className="font-hairline mb-6 text-center text-3xl py-5">
            Login or Register
          </h1>
          <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="font-bold text-grey-darker block mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                placeholder="Your Email"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold text-grey-darker block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                placeholder="Your Password"
                onChange={handleChange}
              />
            </div>

            <div className="flex">
              <button
                className="bg-indigo-500 border 
            hover:border-indigo-500 text-white hover:text-grey-500
            font-bold py-2 px-4 rounded-full mr-3"
                disabled={loading}
                onClick={loginHandler}
              >
                Login
              </button>

              <button
                className="bg-transparent border border-indigo-500
            hover:border-indigo-500 text-gray-500 hover:text-indigo-500
            font-bold py-2 px-4 rounded-full"
                onClick={registerHandler}
                disabled={loading}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
