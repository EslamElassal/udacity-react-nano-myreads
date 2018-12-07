import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    prevSearch: '',
    userSearch: '',
    curBooks: [],
  };

  handleSearch = query => {
    this.setState(() => ({
      userSearch: query.trim(),
    }))
  }

   componentDidUpdate = () => {
    const { userSearch, prevSearch } = this.state;

    if (userSearch !== prevSearch){
      if(userSearch !== ''){
        BooksAPI.search(userSearch)
          .then(books => {
              if(books !== undefined && books.length > 0){
                this.setState(() => ({
                  prevSearch: userSearch,
                  curBooks: books,
                }));
              } else {
                this.setState(() => ({
                  prevSearch: userSearch,
                  curBooks: [],
                }));
              }
          });
      } else {
        this.setState(() => ({
          prevSearch: userSearch,
          curBooks: [],
        }));
      }
    }
   };

  render() {
    const { handleSearch } = this;
    const { userSearch, curBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>              
          <div className="search-books-input-wrapper">
            {/* START HERE?
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={userSearch}
              onChange={(event) => handleSearch(event.target.value)}
            />               
          </div>
        </div>
        <div className="search-books-results">
          {curBooks !== [] ? (
            <ol className="books-grid">
              {curBooks.map(book => (
                // if imageLinks is array, then thumbnail
                // else get the individual image?
                // console.log each book in 'journey' search to discover properties
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                    {book.imageLinks !== undefined ? (
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    ) : (
                      <div className="book-cover" style={{ width: 128, height: 193 }}></div>
                    )}
                      <div className="book-shelf-changer">
                        <select>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                  {book.title !== undefined ? (
                    <div className="book-title">{book.title}</div>
                  ) : (
                    <div className="book-title">Untitled</div>
                  )}
                  {book.authors !== undefined ? (
                    <div className="book-authors">{book.authors[0]}</div>
                  ) : (
                    <div className="book-authors">Unknown</div>  
                  )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <ol className="books-grid"></ol>
          )}
        </div>
      </div>
    );
  };
};

export default Search;