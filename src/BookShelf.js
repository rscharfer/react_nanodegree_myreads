import React from 'react';
import { Component } from 'react';
import Book from './Book.js'



class BookShelf extends Component {

  render(){

    return <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.header}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.map((book,index)=>{
                   function makeid() {
                      // from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
                      var text = "";
                      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                      for (var i = 0; i < 5; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                          return text;
                    } 
                    return <li key={makeid()}><Book id={book.id} refreshBooks = {this.props.refreshBooks} label={this.props.label} title={book.title} author={book.authors} url={book.imageLinks.thumbnail}/></li>
                  })}
                  </ol>
              </div>
            </div>
  }
}

















export default BookShelf