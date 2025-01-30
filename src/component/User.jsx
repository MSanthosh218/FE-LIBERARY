
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const { id: userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
    fetchBooks();
  }, []);

  
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      console.log("User API Response:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
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
      fetchBooks(); 
    } catch (error) {
      console.error("Error renting book:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Library App</h1>

     
      {loading ? (
        <p>Loading user details...</p>
      ) : user ? (
        <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9",color:"black" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>User Details</h2>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p style={{ color: "red" }}>User not found!</p>
      )}

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>Available Books</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd",color:"black" }}>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} style={{ textAlign: "center" }}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.quantity}</td>
                <td>
                  {book.quantity > 0 ? (
                    <button
                      onClick={() => handleRentBook(book.id)}
                      style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                      }}
                    >
                      Rent
                    </button>
                  ) : (
                    <span style={{ color: "red" }}>Out of Stock</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
