// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = async (query) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if (!response.ok) {
        throw new Error('something went wrong!');
    }

    const { items } = await response.json();

    console.log(items)

    return items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || 'No description to display',
        image: book.volumeInfo.imageLinks?.thumbnail || 'https://authors.bookfunnel.com/wp-content/uploads/2017/02/Soothing_Clouds.jpg',
        link: book.volumeInfo.infoLink || ''
    }));
};
