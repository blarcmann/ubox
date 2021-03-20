import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (ViewComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {

    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login')
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/')
          }
          else {
            if (option === false) {
              props.history.push('/')
            }
          }
        }
      })

    }, [])

    return (
      <ViewComponent {...props} user={user} />
    )
  }
  return AuthenticationCheck
}