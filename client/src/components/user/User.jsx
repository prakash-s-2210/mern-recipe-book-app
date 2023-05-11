import React from 'react';
import "../user/User.scss";


/**
 * Renders user details
 * @param {Object} user - The user object containing user information
 * @returns {JSX.Element} - The user details component
 */

const User = ({user}) => {
  return (
    <div className='user-details-container'>
        <div className='user-details-flex'>
            <span className='user-name-style'>{user.firstName} {user.lastName}</span>
            <span className='user-email-style'>{user.email}</span>
        </div>
        <div>
            <img  src={`https://recipe-book-ycpw.onrender.com/assets/${user.picture}`} alt={user.picture} className='user-image-style' />
        </div>
    </div>
  )
}

export default User