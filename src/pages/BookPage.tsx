// BookPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../components/Book'; // Import the Book component from the Book.tsx file
interface BookData {
  id: number;
  title: string;
  writer: string;
  point: number;
}

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BookData[]>(process.env.REACT_APP_API_URL +'/books');
        setBooks(response.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <form className="d-flex" style={{width:'50%',margin:"5px auto", alignSelf:'center'}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap', margin:"5px"}}>
      {books.map(book => (
        <Book
          key={book.id}
          title={book.title}
          writer={book.writer}
          point={book.point}
        />
      ))}  
    </div>
    </div>
  );
};

export default BookPage;
