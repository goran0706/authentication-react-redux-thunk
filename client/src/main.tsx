import { ChakraProvider, ColorModeScript, ThemeConfig } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import ErrorPage from './pages/ErrorPage'
import Users from './pages/Users'
import SignIn from './pages/auth/SignIn'
import SignOut from './pages/auth/SignOut'
import SignUp from './pages/auth/SignUp'
import { store } from './state'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/users', element: <Users /> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-out', element: <SignOut /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript
      initialColorMode={(theme.config as ThemeConfig).initialColorMode}
    />
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
