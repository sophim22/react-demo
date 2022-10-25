import React from "react";
import {Link} from 'react-router-dom';
function UserProfile() {
  return (
    <div className="fixed w-full h-screen bg-white">
      <div className="w-11/12 py-5 m-auto">
        <Link to={'/user'}>
          <button className="bg-gray-300 px-3 py-1 rounded-lg">back</button>
        </Link>

        <div className="mt-10 bg-gray-500 p-5 opacity-50 h-80 relative">
          <div className="w-40 h-40 rounded-full bg-white flex justify-center items-center absolute bottom-5">
            <img src="" alt="profile"></img>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default UserProfile;