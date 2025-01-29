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

  // Fetch books when the component mounts
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

  // Add a new book
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
      console.error("Error adding book:", error.response ? error.response.data : error.message);
    }
  };

  // Update an existing book
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
      console.error("Error updating book:", error.response ? error.response.data : error.message);
    }
  };

  // Delete a book
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Add New Book */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add a New Book</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newBook.quantity}
            onChange={(e) =>
              setNewBook({ ...newBook, quantity: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddBook}
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Books Table */}
      <h2 className="text-xl font-semibold mb-2">Books</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">Genre</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border border-gray-300 px-4 py-2">{book.id}</td>
              <td className="border border-gray-300 px-4 py-2">{book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.author}</td>
              <td className="border border-gray-300 px-4 py-2">{book.genre}</td>
              <td className="border border-gray-300 px-4 py-2">{book.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">{book.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setEditBook({ ...book })}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Book */}
      {editBook && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Edit Book</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editBook.title}
              onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
            />
            <input
              type="text"
              value={editBook.author}
              onChange={(e) =>
                setEditBook({ ...editBook, author: e.target.value })
              }
            />
            <input
              type="text"
              value={editBook.genre}
              onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
            />
            <input
              type="number"
              value={editBook.quantity}
              onChange={(e) =>
                setEditBook({ ...editBook, quantity: e.target.value })
              }
            />
            <input
              type="number"
              value={editBook.price}
              onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateBook}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
