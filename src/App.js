/* eslint-disable react/jsx-equals-spacing */
import React from 'react';
import { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchPage from './SearchPage.js'
import BookShelf from './BookShelf.js'



class BooksApp extends Component {
 
  constructor(props){

    super(props);
    this.state = {wantToReadBooks:[],readBooks:[],currentlyReadingBooks:[], allBooks:[]};
    this.refreshBooks = this.refreshBooks.bind(this);
  }

  componentDidMount(){

      this.refreshBooks();
  }



  refreshBooks(){

    BooksAPI.getAll().then(books=>{

      this.setState({
        allBooks:books,
        wantToReadBooks : books.filter(book=>book.shelf==="wantToRead"),
        readBooks : books.filter(book=>book.shelf==="read"),
        currentlyReadingBooks : books.filter(book=>book.shelf==="currentlyReading")
      });
    });
  }

  render() {

  	
    return (
      <div className="app">


      <Route path="/search" render={()=>(<SearchPage refreshBooks={this.refreshBooks} allBooks={this.state.allBooks}/>)}/>

        <Route path="/" exact render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf header = "Currently Reading" label="currentlyReading" books={this.state.currentlyReadingBooks} refreshBooks={this.refreshBooks}/>
                <BookShelf header = "Want to Read" label="wantToRead" books={this.state.wantToReadBooks} refreshBooks={this.refreshBooks}/>
                <BookShelf header = "Read" label="read" books={this.state.readBooks} refreshBooks={this.refreshBooks}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )}/>
      </div>
    );
  }
}



















export default BooksApp
