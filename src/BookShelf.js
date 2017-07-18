import React from 'react';
import { Component } from 'react';
import Book from './Book.js'



class BookShelf extends Component {

  render(){

    const uniqueIDs = [];
    let isUnique = false;
    let uniqueBooks; 
    if(Array.isArray(this.props.books)) uniqueBooks = this.props.books.filter((book)=>(isUnique = !uniqueIDs.includes(book.id), uniqueIDs.push(book.id), isUnique))


    return <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.header}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {uniqueBooks.map((book,index)=>{
                  
                    return <li key={book.id}><Book id={book.id} refreshBooks = {this.props.refreshBooks} label={this.props.label} title={book.title} author={book.authors} url={book.imageLinks.thumbnail}/></li>
                  })}
                  </ol>
              </div>
            </div>
  }
}

















export default BookShelf