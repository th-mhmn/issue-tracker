'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import IssuesActions from './IssuesActions'

const error = () => {
  return (
    <div>
      <IssuesActions />
      <ErrorMessage>An error occured while fetching issues data.</ErrorMessage>
    </div>
  )
}

export default error
