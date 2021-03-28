import React, { Fragment } from 'react'
import Header from '../components/nav/header'
// import Footer from '../components/nav/footer'

export default function WithNav({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
      {/* <Footer /> */}
    </Fragment>
  )
}
