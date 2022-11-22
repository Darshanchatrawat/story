import React from 'react';
import Loader from "./Loader";

function ThemedSuspense() {
  return (
    <div className="w-full h-full p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      {/* Loading... */}
      <div className="flex items-center flex-col w-full">
        <img src="/logo.png" style={{ width: 200, height: 100, objectFit: "contain" }} className="mr-5" />
        <Loader  />
      </div>
    </div>
  )
}

export default ThemedSuspense
