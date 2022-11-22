import React from 'react'

import Logo from '../assets/img/logo.png';
import BgImage from '../assets/img/bg-blue-img.jpg';

import LoginForm from "../components/Forms/LoginForm";

function Login() {
  return (
    <div className="h-screen">
      <div className="relative flex min-h-full justify-center md:px-12 lg:px-0">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            <div className="flex flex-col">
              <a href="/" aria-label="Home">
                <img src={Logo} alt="" className="h-10 w-auto" />
              </a>
              <div className="mt-20">
                <h2 className="text-lg font-semibold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-sm text-gray-700"> Don’t have an account? <a href="/auth/create-account" className="font-medium text-blue-600 hover:underline"> Sign up </a> for a free trial. </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-y-8">
              {/* <div id="email" value="">
                <label>Email address</label>
                <input value={formData.email} onChange={(e) => setformData((old) => ({ ...old, email: e.target.value }))} type="email" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" />
              </div>
              <div id="password" value="">
                <label>Password</label>
                <input value={formData.password} onChange={(e) => setformData((old) => ({ ...old, password: e.target.value }))} type="password" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" />
              </div>
              <button onClick={Submit} className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-gray-100 hover:bg-blue-700"> Sign in <span aria-hidden="true" className="pl-2">→</span></button> */}

              <LoginForm />
            </div>
          </div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <img src={BgImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default Login
