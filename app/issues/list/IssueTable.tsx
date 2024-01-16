import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'
import { default as Link, default as NextLink } from 'next/link'

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  page: string
}

interface Props {
  searchParams: IssueQuery
  issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  )
}

const columns: {
  label: string
  value: keyof Issue
  className?: string
}[] = [
  { label: 'Issue', value: 'title' },
  {
    label: 'Created',
    value: 'created_at',
    className: 'hidden md:table-cell',
  },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
]

export const columnNames = columns.map((column) => column.value)

export default IssueTable
