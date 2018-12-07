import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search';

// const initialBooks = {
//   currentlyReading: ['PGR2AwAAQBAJ', 'yDtCuFHXbAYC'],
//   wantToRead: ['uu1mC6zWNTwC', 'wrOQLV6xB-wC'],
//   read: ['pD6arNyKyi8C', '1q_xAwAAQBAJ', '32haAAAAMAAJ'],
// }

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  // componentDidMount = () => {
  //   Object.keys(initialBooks).map(shelf => {
  //     initialBooks[shelf].map(bookID => {
  //       BooksAPI.get(bookID)
  //         .then(book => {
  //           console.log(`We have book: ${book}`);
  //           this.setState(curState => ({
  //             [shelf]: curState[shelf].concat([book]),
  //           }))
  //         })
  //     })
  //   })
  // }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    console.log(this.state);

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    {currentlyReading !== [] ? (
                      <ol className="books-grid">
                        {currentlyReading.map(book => (
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

                    {/* <ol className="books-grid">
                      {currentlyReading.map(book => (
                        <li>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
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
                            <div className="book-title">To Kill a Mockingbird</div>
                            <div className="book-authors">Harper Lee</div>
                          </div>
                        </li>
                      ))}
                      <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
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
                          <div className="book-title">Ender's Game</div>
                          <div className="book-authors">Orson Scott Card</div>
                        </div>
                      </li>
                    </ol> */}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    {wantToRead !== [] ? (
                      <ol className="books-grid">
                        {wantToRead.map(book => (
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    {read !== [] ? (
                      <ol className="books-grid">
                        {read.map(book => (
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
              </div>
            </div>
            <Link to='/search' className='open-search'>Add a book</Link>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
