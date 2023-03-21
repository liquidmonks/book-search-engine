// Import required React hooks and components
import React, { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ME } from '../graphql/queries'
import { REMOVE_BOOK } from '../graphql/mutations'
import Auth from '../utils/auth'
import { TrashIcon } from '@heroicons/react/24/solid'
import { removeBookId } from '../utils/localStorage';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

// Define the SavedBooks component
export default function SavedBooks() {
    // Fetch the user data using the GET_ME query and handle loading state
    const { loading, data } = useQuery(GET_ME)
    // Initialize the deleteBookMutation using the REMOVE_BOOK mutation
    const [deleteBookMutation] = useMutation(REMOVE_BOOK)
    // Use local state to store the user data
    const [userData, setUserData] = useState({})

    // Update the userData state whenever data changes
    useEffect(() => {
        if (data?.getMe) {
            setUserData(data?.getMe)
        }
    }, [data])

    // Function to handle deleting a book
    const handleDeleteBook = (bookId) => {
        deleteBookMutation({
            variables: {
                bookId
            }
        })
        removeBookId(bookId);
    }

    // Render the SavedBooks component
    return (
        <div>
            <div className='text-light bg-dark py-5 mb-5'>
                <Container>
                    <h1>Viewing saved books!</h1>
                </Container>
            </div>

            <Container>
                <h3>
                    {
                        loading ? 'Loading Books...'
                            : userData?.bookCount
                                ? `Viewing ${data.getMe.bookCount} saved books:`
                                : 'You have no saved books!'
                    }</h3>

                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 4 }} className='mt-2'>
                    <Masonry gutter={20}>
                        {
                            userData?.savedBooks?.map((book) => {
                                return (
                                    <div className="p-2">
                                        <Card key={book.bookId} className='shadow-sm border'>
                                            <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                                            <Card.Body>
                                                <Card.Title>{book.title}</Card.Title>
                                                <p className='italic-light'>Authors: {book.authors}</p>
                                                <Card.Text>{book.description}</Card.Text>
                                                {Auth.loggedIn() && (
                                                    <Button onClick={() => handleDeleteBook(book.bookId)} variant='danger' size='sm' className='d-flex align-items-center gap-2'>
                                                        <span>Delete this Book!</span>
                                                        <TrashIcon width={24} />
                                                    </Button>
                                                )}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </Container>
        </div >

    );
}
