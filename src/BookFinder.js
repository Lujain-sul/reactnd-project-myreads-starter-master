import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as BooksAPI from './BooksAPI'

/**
* development guide from:
* https://github.com/udacity/reactnd-contacts-complete
*/
class BookFinder extends Component {
  /**
  * Query to be searched and search results
  */
  state = {
    query: '',
    searchResult: []
  }

  /**
  * Search relevant books when the user is typing a query 'on typing'
  */
  updateQuery = (event) => {
    this.setState({ query: event.target.value }, ()=> {
      this.findBook(this.state.query)
    }
  )}

  /**
  * Search relevant books when the user press 'Enter'
  */
  handleSubmit = (event) => {
    event.preventDefault()
    const values = serializeForm(event.target, { hash: true })
    this.setState({ query: values }, ()=> {
      this.findBook(this.state.query.query)
    }
  )}

  /**
  * Search relevant books
  */
  findBook = (keyword) => {
    // Search query is not empty
    if (keyword.length !== 0) {
      BooksAPI.search(keyword, 20).then((results) => {
        // Search is completed without errors
        if (results.error !== 'empty query') {
          this.setState(state => ({
            // Update search results
            searchResult: results.map((c) => {
              // Initialize book's shelf as none
              c.shelf = 'none'
              // Check whether a book in the results already belongs to a shelf, and update shelf accordingly
              this.props.books.forEach((book) => {
                if (c.id === book.id) {
                  c.shelf = book.shelf
                }
              })
              return c
            })
          }))
        }
        // No relevant results, clear results
        else {
          this.setState({searchResult: []})
        }

      })
    }
  }

  /**
  * Move a book in the search results to a shelf
  */
  updateResults = (book, shelf) => {
    // Reflect the update in books appear in the Main screen
    this.props.onUpdateShelf(book, shelf)
    // Reflect the update in books appear in the search screen
    this.setState(state => ({
      searchResult: state.searchResult.map((c) => {
        if (c.id === book.id) {
          c.shelf = shelf
        }
        return c
      })
    })
  )}

  /**
  * Render the component
  */
  render() {
    return (
      <div className="search-books">
      <div className="search-books-bar">
      <Link className='close-search' to='/'>Close</Link>
      <div className="search-books-input-wrapper">
      {/* Handle events on search box, pressing Enter and typing */}
      <form onSubmit={this.handleSubmit} className='create-contact-form'>
      <input type="text" name="query" placeholder="Search by title or author"
      onChange={this.updateQuery}
      />
      </form>
      </div>
      </div>
      <div className="search-books-results">
      <ol className="books-grid">
      {/* Check that query is not empty and there exists relevant result */}
      {  this.state.query.length !== 0 &&
        this.state.searchResult.length !== 0 &&
        this.state.searchResult.map((book) => (
          <li key={book.id} className='contact-list-item'>
          <div className="book">
          <div className="book-top">
          {/* Check whether current book has imageLinks property or it is undefined */}
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: book.hasOwnProperty('imageLinks') ? `url(${book.imageLinks.smallThumbnail})` : ''}}></div>
          <div className="book-shelf-changer">
          {/* Maintain the current selected shelf
            Call updateResults when shelf dropdown selection is changed */}
            <select value={book.shelf} onChange={(event) => this.updateResults(book, event.target.value)} >
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
      )}
    }

    export default BookFinder
