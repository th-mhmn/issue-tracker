import { issueSchema } from '@/utils/schemas'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })
  if (!issue)
    return NextResponse.json(
      { error: 'Issue with the given id not found' },
      { status: 404 },
    )

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  })

  return NextResponse.json({})
}
