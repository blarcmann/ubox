/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

const user = JSON.parse(localStorage.getItem('auth'));

export default function AuthHOC (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {

    useEffect(() => {
      if (!user) {
        if (option) {
          props.history.push('/login');
        }
        //Logged in Status 
      } else {
        //supposed to be Admin page, but not admin person wants to go inside
        if (adminRoute && !user.isAdmin) {
          props.history.push('/')
        }
        //Logged in Status, but Try to go into log in page 
        else {
          if (option === false) {
            props.history.push('/')
          }
        }
      }
    })

    return (
      <SpecificComponent {...props} user={user} />
    )
  }
  return AuthenticationCheck
}