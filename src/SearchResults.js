import React from 'react';
import { Component } from 'react';
import Book from './Book.js'


class SearchResults extends Component {
  
  constructor(props){
    super(props);
  }


  render(){

    const uniqueIDs = [];
    let isUnique = false;
    let uniqueBooks; 
    if(Array.isArray(this.props.books)) uniqueBooks = this.props.books.filter((book)=>(isUnique = !uniqueIDs.includes(book.id), uniqueIDs.push(book.id), isUnique))


    return <div className="search-books-results">
              <ol className="books-grid">
              {
                Array.isArray(this.props.books)&&uniqueBooks.map((book,index)=>{
                    if (book.imageLinks) {

                      return <li key={book.id}><Book id={book.id} title={book.title} refreshBooks = {this.props.refreshBooks} author={book.authors} label={book.shelf} url={book.imageLinks.thumbnail}/></li>
                    } 
                  })}</ol>
              
            </div>
  }
}



export default SearchResults
