import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '4', md: '5' }} gap="5">
      <Box className="md:col-span-3 lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {session && (
          <Flex direction={'column'} gap={'4'}>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
            <AssigneeSelect issue={issue} />
          </Flex>
        )}
      </Box>
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  return {
    title: issue?.title,
    description: 'Details of issue' + issue?.id,
  }
}

export default IssueDetailsPage
