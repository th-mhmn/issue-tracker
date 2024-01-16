import prisma from '@/prisma/client'
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import NextLink from 'next/link'
import { Link, IssueStatusBadge } from '@/app/components'
import IssuesActions from './IssuesActions'
import { Issue, Status } from '@prisma/client'
import { TriangleUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue }
}

const columns: {
  label: string
  value: keyof Issue
  className?: string
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Created', value: 'created_at', className: 'hidden md:table-cell' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
]

const Issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  })
  return (
    <div>
      <IssuesActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <TableColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {searchParams.orderBy === column.value && (
                  <TriangleUpIcon className="inline" />
                )}
              </TableColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.created_at.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic'
// export const revalidate = 30

export default Issues
