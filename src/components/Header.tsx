import { Link } from '@tanstack/react-router'
import { GiIdea } from 'react-icons/gi'

const Header = () => {
  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <Link to='/' className='flex items-center space-x-2'>
            <GiIdea className='w-6 h-6 text-amber-600' />
            <h1 className='text-5xl text-logo text-amber-600'>
              Logos II
            </h1>
          </Link>
        </div>
        <nav className='flex items-center space-x-4'>
          <Link
            to='/ideas'
            className='text-gray-900 hover:text-amber-600 font-medium transitioning px-3 py-2'
          >
            Ideas
          </Link>
          <Link
            to='/ideas/new'
            className='text-white bg-amber-600 text-center px-4 py-2 rounded hover:bg-amber-500 transitioning uppercase'
          >
            New Idea
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header