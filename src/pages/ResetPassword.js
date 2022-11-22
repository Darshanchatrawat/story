import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import ResetPasswordForm from '../components/Forms/ResetPasswordForm'

function ResetPassword() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Link to="/" className="px-8 pt-8 text-xl font-bold text-gray-800 dark:text-gray-200">
        Rocket
      </Link>
      <div className="flex flex-1 h-full items-center mt-4 lg:mt-0 p-6">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl">
          <div className="bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <div className="h-32 md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  className="object-cover w-full h-full dark:hidden"
                  src={ImageLight}
                  alt="Office"
                />
                <img
                  aria-hidden="true"
                  className="hidden object-cover w-full h-full dark:block"
                  src={ImageDark}
                  alt="Office"
                />
              </div>
              <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Reset password
                  </h1>

                  <ResetPasswordForm />

                  <hr className="my-8" />

                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                      to="/auth/login"
                    >
                      Already have an account? Login
                    </Link>
                  </p>

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
