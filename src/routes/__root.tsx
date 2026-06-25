import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Link,
  Outlet,
  createRootRouteWithContext
} from '@tanstack/react-router'
import '../styles.css'
import Header from '#/components/Header'

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Share, explore, collaborate and build on startup ideas and projects.'
      },
      {
        title: 'Logos II - Your Creation Platform'
      }
    ]
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <div className='min-h-screen bg-amber-50 flex flex-col'>
      <HeadContent />
      <Header />
      <main className='flex justify-center p-6'>
        <div className='w-full max-w-4xl bg-white rounded shadow p-8'>
          <Outlet />    
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center ex-center py-20'>
      <h1 className='text-4xl font-medium text-amber-600  mb-4'>
        404
      </h1>
      <p className='text-gray-700 mb-6'>
        Page No Found
      </p>
      <Link
        to='/'
        className='text-white bg-amber-600 text-center px-4 py-2 rounded hover:bg-amber-500 transitioning uppercase'
      >
        Back Home
      </Link>
    </div>
  )
}
