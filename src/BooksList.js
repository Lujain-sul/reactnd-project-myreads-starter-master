import React, { Component } from 'react'
import { Link } from 'react-router-dom'

/**
* development guide from:
* https://github.com/udacity/reactnd-contacts-complete
*/
class BooksList extends Component {
  /**
  * Render the component
  */
  render() {
    return (
      <div className="list-books">
      <div className="list-books-title">
      <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
      <div>
      <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
      <ol className="books-grid">
      {/* Filter currentlyReading books to be displayed under Currently Reading shelf */}
      {
        this.props.books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
          <li key={book.id} className='contact-list-item'>
          <div className="book">
          <div className="book-top">
          {/* Check whether current book has imageLinks property or it is undefined  */}
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: book.hasOwnProperty('imageLinks') ? `url(${book.imageLinks.smallThumbnail})` : ''}}></div>
          <div className="book-shelf-changer">
          {/* Maintain the current selected shelf
            Call onUpdateShelf when shelf dropdown selection is changed */}
            <select value={book.shelf} onChange={(event) => this.props.onUpdateShelf(book, event.target.value)} >
            <option value="" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            {/* Check whether current book has authors property or it is undefined */}
            <div className="book-authors">{book.hasOwnProperty('authors') ? book.authors.join(' - ') : ''}</div>
            </div>
            </li>
          ))
        }
        </ol>
        </div>
        </div>
        <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
        {/* Filter wantToRead books to be displayed under Want to Read shelf */}
        {
          this.props.books.filter((book) => book.shelf === 'wantToRead').map((book) => (
            <li key={book.id} className='contact-list-item'>
            <div className="book">
            <div className="book-top">
            {/* Check whether current book has imageLinks property or it is undefined */}
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: book.hasOwnProperty('imageLinks') ? `url(${book.imageLinks.smallThumbnail})` : ''}}></div>
            <div className="book-shelf-changer">
            {/* Maintain the current selected shelf
              Call onUpdateShelf when shelf dropdown selection is changed */}
              <select value={book.shelf} onChange={(event) => this.props.onUpdateShelf(book, event.target.value)}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
              </select>
              </div>
              </div>
              <div className="book-title">{book.title}</div>
              {/* Check whether current book has authors property or it is undefined */}
              <div className="book-authors">{book.hasOwnProperty('authors') ? book.authors.join(' - ') : ''}</div>
              </div>
              </li>
            ))
          }
          </ol>
          </div>
          </div>
          <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
          <ol className="books-grid">
          {/* Filter read books to be displayed under Read shelf */}
          {
            this.props.books.filter((book) => book.shelf === 'read').map((book) => (
              <li key={book.id} className='contact-list-item'>
              <div className="book">
              <div className="book-top">
              {/* Check whether current book has imageLinks property or it is undefined */}
              <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: book.hasOwnProperty('imageLinks') ? `url(${book.imageLinks.smallThumbnail})` : ''}}></div>
              <div className="book-shelf-changer">
              {/* Maintain the current selected shelf
                Call onUpdateShelf when shelf dropdown selection is changed */}
                <select value={book.shelf} onChange={(event) => this.props.onUpdateShelf(book, event.target.value)}>
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                {/* Check whether current book has authors property or it is undefined */}
                <div className="book-authors">{book.hasOwnProperty('authors') ? book.authors.join(' - ') : ''}</div>
                </div>
                </li>
              ))
            }
            </ol>
            </div>
            </div>
            </div>
            </div>
            <div className="open-search">
            <Link to='/search'>Add a book</Link>
            </div>
            </div>
          )
        }
      }

      export default BooksList
