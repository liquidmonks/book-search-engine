// Import React for creating the NotFound component
import React from 'react'
// Import the Container and Image components from 'react-bootstrap' for styling
import { Container, Image } from 'react-bootstrap'

// Define the NotFound component
export default function NotFound() {
  return (
    // Use the Container component to center the content
    <Container className='d-flex flex-column align-items-center justify-content-center py-5'>
      {/* Display an image with a maximum width of 300px */}
      <Image src='/taken.svg' style={{ maxWidth: '300px' }} />
      {/* Display a "Page not found!" heading */}
      <h1 className='mt-4'>Page not found !</h1>
    </Container>
  )
}
