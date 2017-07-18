import React from 'react';
import { Component } from 'react';
import Book from './Book.js'


class SearchResults extends Component {
  
  constructor(props){
    super(props);
  }


  render(){

    return <div className="search-books-results">
              <ol className="books-grid">
              {Array.isArray(this.props.books)&&this.props.books.map((book,index)=>{
                    function makeid() {
                      // from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
                      var text = "";
                      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                      for (var i = 0; i < 5; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                          return text;
                    }
                    if (book.imageLinks) {

                      return <li key={makeid()}><Book id={book.id} title={book.title} refreshBooks = {this.props.refreshBooks} author={book.authors} label={book.shelf} url={book.imageLinks.thumbnail}/></li>
                    } 
                  })}</ol>
            </div>
  }
}



export default SearchResults
