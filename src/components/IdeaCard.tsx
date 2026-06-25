import type { Idea } from "#/types"
import { Link } from "@tanstack/react-router"
import clsx from 'clsx'

const IdeaCard = ({
  idea,
  button = true
}: {
  idea: Idea
  button?: boolean
}) => {
  const linkClasses = clsx({
    'block text-black hover:text-amber-600 transitioning mt-3': !button,
    'text-white bg-amber-600 text-center inline-block mt-4 px-4 py-2 rounded hover:bg-amber-500 transitioning uppercase': button
  })  
  
  return (  
    <div className='border border-amber-300 p-4 rounded shadow-md bg-white flex flex-col justify-between'>
      <div>
        <h2 className='text-lg font-medium text-amber-600'>
          {idea.title}
        </h2>
        <p className='text-gray-700 mt-2'>
          {idea.summary}
        </p>
        <Link
          to='/ideas/$ideaId'
          params={{ ideaId: idea.id.toString() }}
          className={linkClasses} 
        >
          {button
            ? 'View Idea'
            : 'Read More →'
          }
        </Link>
      </div>
    </div>
  )
}
 
export default IdeaCard