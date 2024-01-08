'use client'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { createIssueSchema } from '@/utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, CalloutText, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type IssueFormData = z.infer<typeof createIssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  })
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setError('An unexpected error occured.')
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <CalloutText>{error}</CalloutText>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage> {errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm