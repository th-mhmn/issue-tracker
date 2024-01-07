'use client'

import React from 'react'
import IssuesActions from './IssuesActions'
import ErrorMessage from '../components/ErrorMessage'

const error = () => {
  return (
    <div>
      <IssuesActions />
      <ErrorMessage>An error occured while fetching issues data.</ErrorMessage>
    </div>
  )
}

export default error
