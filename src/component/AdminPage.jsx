import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    quantity: "",
    price: "",
  });
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddBook = async () => {
    try {
      await axios.post("http://localhost:5000/books", {
        ...newBook,
        quantity: parseInt(newBook.quantity),
        price: parseFloat(newBook.price),
      });
      fetchBooks();
      setNewBook({ title: "", author: "", genre: "", quantity: "", price: "" });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleUpdateBook = async () => {
    if (!editBook) return;
    try {
      await axios.put(`http://localhost:5000/books/${editBook.id}`, {
        ...editBook,
        quantity: parseInt(editBook.quantity),
        price: parseFloat(editBook.price),
      });
      fetchBooks();
      setEditBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const styles = {
    container: { padding: "20px", maxWidth: "1000px", margin: "auto", fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa" },
    card: { background: "white", padding: "20px", marginBottom: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" },
    title: { textAlign: "center", fontSize: "28px", marginBottom: "20px" },
    inputGroup: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" },
    input: { flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" },
    button: { padding: "10px 15px", border: "none", cursor: "pointer", fontSize: "16px", borderRadius: "5px", transition: "0.3s" },
    btnAdd: { backgroundColor: "#007bff", color: "white" },
    btnEdit: { backgroundColor: "#ffc107", color: "black" },
    btnDelete: { backgroundColor: "#dc3545", color: "white", marginLeft: "5px" },
    btnSave: { backgroundColor: "#28a745", color: "white" },
    tableContainer: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse" ,color:"black" },
    thTd: { padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" },
    th: { backgroundColor: "#f4f4f4" ,color:"black"},
    h2:{color:"black"},
    trHover: { backgroundColor: "#f1f1f1" }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Panel</h1>

      {/* Add New Book */}
      <div style={styles.card}>
        <h2>Add a New Book</h2>
        <div style={styles.inputGroup}>
          {["Title", "Author", "Genre", "Quantity", "Price"].map((field) => (
            <input
              key={field}
              type={field === "Quantity" || field === "Price" ? "number" : "text"}
              placeholder={field}
              value={newBook[field.toLowerCase()]}
              onChange={(e) => setNewBook({ ...newBook, [field.toLowerCase()]: e.target.value })}
              style={styles.input}
            />
          ))}
        </div>
        <button style={{ ...styles.button, ...styles.btnAdd }} onClick={handleAddBook}>
          Add Book
        </button>
      </div>

      {/* Books Table */}
      <div style={styles.card}>
        <h2 style={styles.h2}>Books</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["ID", "Title", "Author", "Genre", "Quantity", "Price", "Actions"].map((header) => (
                  <th key={header} style={{ ...styles.thTd, ...styles.th }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} style={styles.trHover}>
                  {["id", "title", "author", "genre", "quantity", "price"].map((key) => (
                    <td key={key} style={styles.thTd}>{book[key]}</td>
                  ))}
                  <td style={styles.thTd}>
                    <button style={{ ...styles.button, ...styles.btnEdit }} onClick={() => setEditBook({ ...book })}>
                      Edit
                    </button>
                    <button style={{ ...styles.button, ...styles.btnDelete }} onClick={() => handleDeleteBook(book.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Book */}
      {editBook && (
        <div style={styles.card}>
          <h2>Edit Book</h2>
          <div style={styles.inputGroup}>
            {["Title", "Author", "Genre", "Quantity", "Price"].map((field) => (
              <input
                key={field}
                type={field === "Quantity" || field === "Price" ? "number" : "text"}
                value={editBook[field.toLowerCase()]}
                onChange={(e) => setEditBook({ ...editBook, [field.toLowerCase()]: e.target.value })}
                style={styles.input}
              />
            ))}
          </div>
          <button style={{ ...styles.button, ...styles.btnSave }} onClick={handleUpdateBook}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
