import React from 'react'
// Import the ApolloProvider component to connect the Apollo Client to React
import ApolloProvider from './graphql/client'
// Import the Routes and Route components from 'react-router-dom' for routing
import { Routes, Route } from 'react-router-dom'
// Import the Navbar component to be displayed in the app
import Navbar from './components/Navbar'
// Import the SearchBooks, SavedBooks, and NotFound pages
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'
import NotFound from './pages/NotFound'
// Import the Auth utility to handle user authentication
import Auth from './utils/auth'

// Define the App component
export default function App() {
  return (
    // Wrap the app with ApolloProvider to connect the Apollo Client to React
    <ApolloProvider>
      {/* Render the Navbar component */}
      <Navbar />
      {/* Define the routes for the application */}
      <Routes>
        {/* Route for the SearchBooks page */}
        <Route path='/' element={<SearchBooks />} />
        {
          // Conditionally render the SavedBooks route if the user is logged in
          Auth.loggedIn() && (
            <>
              <Route path='/saved' element={<SavedBooks />} />
            </>
          )
        }
        {/* Route for the NotFound page */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  )
}
