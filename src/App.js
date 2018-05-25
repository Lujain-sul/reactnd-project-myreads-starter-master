import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import BooksList from './BooksList'
import BookFinder from './BookFinder'
import * as BooksAPI from './BooksAPI'

/**
* Development guide from:
* https://github.com/udacity/reactnd-contacts-complete
*/
class BooksApp extends React.Component {
  /**
  * Books added to shelves
  */
  state = {
    books: []
  }

  /**
  * Initialize book shelves
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /**
  * Move a book to a shelf
  */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {

      // Remove the book from shelves
      if (shelf === 'none') {
        this.setState((state) => ({
          books: state.books.filter((c) => c.id !== book.id)
        }))
      }

      // The book is newly added to a shelf
      else if (this.state.books.filter((c) => c.id === book.id).length === 0) {
        this.setState((state) => ({
          books: state.books.concat([book])
        }))
      }

      // The book belongs to a shelf which should be changed
      else {
        this.setState(state => ({
          books: state.books.map((c) => {
            if (c.id === book.id) {
              // Update the book's shelf
              c.shelf = shelf
            }
            return c
          })
        }))
      }

    })
  }

  /**
  * Render the component
  */
  render() {
    return (
      <div className="app">
      <Route exact path='/search' render={() => (
        <BookFinder onUpdateShelf={this.updateShelf} books={this.state.books}/>
      )}/>
      <Route exact path='/' render={() => (
        <BooksList onUpdateShelf={this.updateShelf} books={this.state.books} />
      )}/>
      </div>
    )
  }
}

  export default BooksApp
