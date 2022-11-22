import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import CreateAccountForm from '../components/Forms/CreateAccountForm'
import GithubAuthForm from '../components/Forms/GithubAuthForm'
import GoogleAuthForm from '../components/Forms/GoogleAuthForm'


import Logo from '../assets/img/logo.png';
import BgImage from '../assets/img/bg-blue-img.jpg';

function CreateAccount() {
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
                <h2 className="text-lg font-semibold text-gray-900">Get started for free</h2>
                <p className="mt-2 text-sm text-gray-700"> Already registered? <a href="/auth/login" className="font-medium text-blue-600 hover:underline"> Sign in </a> to your account. </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-y-8">
              <CreateAccountForm />
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

export default CreateAccount
