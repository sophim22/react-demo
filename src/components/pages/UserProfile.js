import React from "react";
function UserProfile() {
  return (
    <div className="mt-48">
      <h1 className="capitalize flex justify-center mb-5 text-2xl font-bold">Welcome</h1>
      <div className="bg-gray-300 w-1/2 m-auto p-3 rounded">
        <h3>User ID : </h3>
        <h3>Username : </h3>
        <h3>Email : </h3>
        <h3>Phone : </h3>
      </div>
    </div>
  )

}

export default UserProfile;