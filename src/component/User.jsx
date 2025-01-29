import React, { useEffect, useState } from "react";
import axios from "axios";

const User = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchUserDetails();
    fetchBooks();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleRentBook = async (bookId) => {
    try {
      await axios.post(`http://localhost:5000/rent/${userId}`, { book_id: bookId });
      fetchBooks(); // Refresh books after renting
    } catch (error) {
      console.error("Error renting book:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {user && (
        <div style={{ marginBottom: "20px" }}>
          <h2>User Details</h2>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <h2>Available Books</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.quantity}</td>
              <td>
                {book.quantity > 0 ? (
                  <button
                    onClick={() => handleRentBook(book.id)}
                    style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: "blue", color: "white", border: "none" }}
                  >
                    Rent
                  </button>
                ) : (
                  <span>Out of Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;