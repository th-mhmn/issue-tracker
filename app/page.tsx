import { Flex, Grid } from '@radix-ui/themes'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
import prisma from '@/prisma/client'
import { Metadata } from 'next'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  })

  const issueProps = { open, closed, inProgress }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex gap="5" direction="column">
        <IssueSummary {...issueProps} />
        <IssueChart {...issueProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker | Dashboard',
  description: 'View a summary of project issues',
}
