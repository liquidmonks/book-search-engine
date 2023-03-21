// Import required React hooks and components
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Image } from "react-bootstrap";
import Auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/GoogleBooksAPI";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SAVE_BOOK } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// Define the SearchBooks component
export default function SearchBooks() {
  // Initialize the state variables
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [saveBookMutation] = useMutation(SAVE_BOOK);

  // Save the book IDs when the component unmounts
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // Function to handle form submission for searching books
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      setLoading(true);
      const books = await searchGoogleBooks(searchInput);
      setBooks(books);
      setLoading(false);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle saving a book
  const handleSaveBook = (book) => {
    saveBookMutation({
      variables: {
        ...book,
      },
    });
    setSavedBookIds((prev) => [...prev, book.bookId]);
  };

  // Render the SearchBooks component
  return (
    <div>
      <div className="text-light bg-dark py-5 mb-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <div className="d-flex gap-2 flex-wrap flex-md-nowrap">
              <Form.Control name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search for a book" style={{ width: "100%" }} />
              <Button disabled={loading} type="submit" variant="light" style={{ whiteSpace: "nowrap" }}>
                Submit Search
              </Button>
            </div>
          </Form>
        </Container>
      </div>

      <Container>
        {loading && <h3>Searching Books...</h3>}

        {!loading ? (
          books.length ? (
            <div>
              <h3>Viewing {books.length} results:</h3>
              <Button size="sm" className="text-underline" variant="light" onClick={() => setBooks([])}>
                Clear
              </Button>
            </div>
          ) : (
            <div className="d-flex align-items-center flex-column gap-5">
              <h3>Search for a book to begin</h3>
              <Image src="/searchbook.svg" style={{ maxWidth: "400px" }} />
            </div>
          )
        ) : null}

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 4 }} className="mt-2">
          <Masonry gutter={20}>
            {books.map((book) => {
              const bookSaved = savedBookIds?.find((savedBookId) => savedBookId === book.bookId);
              return (
                <Card key={book.bookId} className="shadow-sm border">
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="italic-light">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button disabled={bookSaved} onClick={() => handleSaveBook(book)} variant="dark" size="sm" className="d-flex align-items-center gap-2">
                        <span>{bookSaved ? "This book has already been saved!" : "Save this Book!"}</span>
                        <HeartIcon width={20} />
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </Container>
    </div>
  );
}
