import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

import '../styles/compontents/loading.scss';

export default function Loading() {

  const loading = useSelector((state) => state.uiReducer.loading);

  return (
    <Fragment>
      {loading
        ? <div className="loading-container">
            <div className="pulse">
              <span></span>
              <span></span>
            </div>
        </div>
        : ''}
    </Fragment>
  )
}
