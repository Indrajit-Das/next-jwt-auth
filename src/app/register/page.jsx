"use client"
import React, { useState } from 'react';
import Link from "next/link";
import {useRouter} from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =async(e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please re-enter your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form or perform further actions
      const callbackurl = '/login';
      const config = {method:'POST',body:JSON.stringify(formData)}
      const response = await fetch('api/register',config); 
     
      const res = await response.json();
      if(res['status']===true){
        router.push(callbackurl);
      }else{
        alert(res['message']);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='enter your name'
            className={`mt-1 p-2 w-full rounded-md bg-slate-800 text-white ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } placeholder-white::placeholder`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder='enter your email'
            onChange={handleChange}
            className={`mt-1 p-2 w-full rounded-md  bg-slate-800 text-white ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }placeholder-white::placeholder`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder='enter password'
            onChange={handleChange}
            className={`mt-1 p-2 w-full rounded-md bg-slate-800 text-white ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } placeholder-white::placeholder`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Re-enter Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder='re-type password'
            onChange={handleChange}
            className={`mt-1 p-2 w-full rounded-md bg-slate-800 text-white ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } placeholder-white::placeholder`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
          <p className='text-blue-700 text-xs underline font-bold underline-offset-4'><Link href={"/login"}>Already registered? Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
