import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation, useSuspenseQuery, queryOptions} from '@tanstack/react-query'
import { fetchIdea, updateIdea } from '@/api/ideas'

const ideaQueryOptions = (id: string) => 
  queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id)
  })

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: IdeaEditPage,
  loader: async({
    params,
    context: { queryClient }
  }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function IdeaEditPage() {
  const { ideaId } = Route.useParams()
  const navigate = useNavigate()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId))

  const [title, setTitle ] = useState(idea.title)
  const [summary, setSummary ] = useState(idea.summary)
  const [description, setDescription ] = useState(idea.description)
  const [tagsInput, setTagsInput ] = useState(idea.tags.join(', '))

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => updateIdea(ideaId, {
      title,
      summary,
      description,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    }),
    onSuccess: () => {
      navigate({
        to: '/ideas/$ideaId',
        params: { ideaId }
      })
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateAsync() 
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-medium text-amber-600'>
          Edit Idea
        </h1>
        <Link
          to='/ideas/$ideaId'
          params={{ ideaId }}
          className='text-black hover:text-amber-600 uppercase transitioning'
        >
          Back
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}  
        className='space-y-2'
      >
        <div>
          <label
            htmlFor='title'
            className='block text-gray-700 font-medium mb-1'
          >
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          />
        </div>
        <div>
          <label
            htmlFor='summary'
            className='block text-gray-700 font-medium mb-1'
          >
            Summary
          </label>
          <input
            id='Summary'
            type='text'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          />
        </div>
        <div>
          <label
            htmlFor='body'
            className='block text-gray-700 font-medium mb-1'
          >
            Description
          </label>
          <textarea
            id='body'
            value={description}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          ></textarea>
        </div>
        <div>
          <label
            htmlFor='tags'
            className='block text-gray-700 font-medium mb-1'
          >
            Tags
          </label>
          <input
            id='tags'
            type='text'
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className='w-full p-2 border border-grey-400 focus:border-amber-600 hover:border-amber-500 outline-none transitioning rounded'
          />
        </div>
        <div className='mt-5'>
          <button
            type='submit'
            disabled={isPending}
            className='block w-full bg-amber-600 hover:bg-amber-500 text-white transitioning font-medium rounded px-6 py-2 uppercase disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending
              ? 'Updating...'
              : 'Update Idea'
            }
          </button>
        </div>
      </form>
    </div>
  )
}
