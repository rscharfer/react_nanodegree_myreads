import React from 'react';
import { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book.js'
import SearchBar from './SearchBar.js'



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


      <Route path="/search" render = {()=>(<SearchPage refreshBooks={this.refreshBooks} allBooks={this.state.allBooks}/>)}/>

        <Route path="/" exact render={()=>(
          <div className="list-books">
            <TitleBar/>
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

class TitleBar extends Component {

  render(){

    return <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
  }
}



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






class SearchPage extends Component{
  constructor(props){
    super(props)
    this.state = {books:[], searchValue:''};
    this.updateResults = this.updateResults.bind(this);
  }




  updateResults(newString){
    

    if (newString){

      let searchPromise = BooksAPI.search(newString,10);
      let libBooks = this.props.allBooks;


      searchPromise.then(values=>{
        
        if (Array.isArray(values)){
          let inLibrary = false;
          let lbShelf = '';
           values.forEach(fb=>{
            libBooks.forEach(lb=>{
            if (lb.id===fb.id) inLibrary = true, lbShelf = lb.shelf;
          })
            if(inLibrary) fb.shelf = lbShelf, inLibrary = false, lbShelf = ''
            else fb.shelf = 'none';
        })
        this.setState({books:values});
        }
        else this.setState({books:[]})
      })
    }

    else this.setState({books:[]})
    
  }

  componentDidMount(){

  	const startValue = this.state.searchValue;
    this.updateResults(startValue)
  
  }

  render(){
    return   <div className="search-books">
            <SearchBar updateResults = {this.updateResults}/>
            <SearchResults books={this.state.books} refreshBooks={this.props.refreshBooks}/>
          </div>
  }
}



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



export default BooksApp
