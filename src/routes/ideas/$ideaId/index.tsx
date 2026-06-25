import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import { fetchIdea, deleteIdea } from '#/api/ideas'

const ideaQueryOptions = (ideaId: string) => queryOptions({
  queryKey: ['idea', ideaId],
  queryFn: () => fetchIdea(ideaId)
})

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId))
  }
})

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams()
  const { data: idea} = useSuspenseQuery(ideaQueryOptions(ideaId))
  const navigate = useNavigate()

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({to: '/ideas'})
    }
  })

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this idea?')

    if (confirmDelete) {
      await deleteMutate()
    }
  }

  return (
    <div className='p-4'>
      <Link
        to='/ideas'
        className='text-black block mb-4 hover:text-amber-600 uppercase transitioning' 
      >
        Back
      </Link>
      <h2 className='text-2xl font-medium'>
        {idea.title}
      </h2>
      <p className='mt-2'>
        {idea.description}
      </p>
      <Link
        to='/ideas/$ideaId/edit'
        params={{ideaId}}
        className='text-white bg-amber-600 text-center inline-block mt-4 px-4 py-2 rounded hover:bg-amber-500 transitioning uppercase disabled:opacity-50 mr-2'
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className='text-white bg-amber-600 text-center inline-block mt-4 px-4 py-2 rounded hover:bg-amber-500 transitioning uppercase disabled:opacity-50'
      >
        { isPending ? 'Deleting...' : 'Delete' }
      </button>
    </div>
  )
}
