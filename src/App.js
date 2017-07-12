import React from 'react';
import { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';



class BooksApp extends Component {
 
  constructor(props){

    super(props);
    this.state = {wantToReadBooks:[],readBooks:[],currentlyReadingBooks:[]};
    this.refreshBooks = this.refreshBooks.bind(this);
    


  }

  componentDidMount(){

      this.refreshBooks();
  }


  refreshBooks(){

    BooksAPI.getAll().then(books=>{

      this.setState({
        wantToReadBooks : books.filter(book=>book.shelf==="wantToRead"),
        readBooks : books.filter(book=>book.shelf==="read"),
        currentlyReadingBooks : books.filter(book=>book.shelf==="currentlyReading")
      });
    });
  }

  render() {

    return (
      <div className="app">

      <Route path="/search" render = {
        ()=>(<SearchPage refreshBooks={this.refreshBooks}/>)

    }



      />

        <Route path="/" exact render={()=>(
          <div className="list-books">
            <TitleBar/>
            <div className="list-books-content">
              <div>
                <BookShelf label="Currently Reading" books={this.state.currentlyReadingBooks} refreshBooks={this.refreshBooks}/>
                <BookShelf label="Want to Read" books={this.state.wantToReadBooks} refreshBooks={this.refreshBooks}/>
                <BookShelf label="Read" books={this.state.readBooks} refreshBooks={this.refreshBooks}/>
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
            <h2 className="bookshelf-title">{this.props.label}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.map((book,index)=>{ 
                    return <li key={book.id}><Book id={book.id} refreshBooks = {this.props.refreshBooks} label={this.props.label} title={book.title} author={book.authors} url={book.imageLinks.thumbnail}/></li>
                  })}
                  </ol>
              </div>
            </div>
  }
}

class Book extends Component {

  constructor(props){
    super(props);
    this.state = {shelf:''};
    this.changeShelf = this.changeShelf.bind(this)
  }

  changeShelf(newShelf){

    this.setState({shelf:newShelf});
    BooksAPI.update({id:this.props.id},newShelf).then((data)=>this.props.refreshBooks());

  }


  

  render() {

    return  <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})`}}></div>
                    <BookShelfChanger label={this.props.label} changeShelf={this.changeShelf}/>
                  </div>
                <div className="book-title">{this.props.title}</div>
                {
                  this.props.author?this.props.author.map(author=><div key={author} className="book-authors">{author}</div>):''

                }
              </div>      
  }
}

class BookShelfChanger extends Component {

  constructor(props){



    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getOptionValue = this.getOptionValue.bind(this);

  }

  handleChange(event) {
      this.props.changeShelf(event.target.value);

      
    }

  getOptionValue(input) {

    switch(input){
      case "Currently Reading" : return 'currentlyReading'; break;
      case "Want to Read": return 'wantToRead'; break;
      case "Read": return 'read'; break;

    }
  }

  render () {

    return  <div className="book-shelf-changer">
              <select value={this.getOptionValue(this.props.label)} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
               </select>
            </div> 
  }
}


class SearchPage extends Component{
  constructor(props){
    super(props)
    this.state = {books:[], searchValue:'Singh'};
    this.updateResults = this.updateResults.bind(this);
  }

  updateResults(e){
    const newString = e.target.value;

    if (newString){

      BooksAPI.search(newString,10).then((books)=>{

      this.setState({books:books})
    })
    }
    
  }

  componentDidMount(){
    BooksAPI.search(this.state.searchValue,10).then((books)=>{
      
      this.setState({books})
    })
    
  }

  render(){
    return   <div className="search-books">
            <SearchBar updateResults = {this.updateResults}/>
            <SearchResults books={this.state.books} refreshBooks={this.props.refreshBooks}/>
          </div>
  }
}

class SearchBar extends Component {

  constructor(props){
    super(props);
  }

  render(){

  
    return <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <SearchInput updateResults={this.props.updateResults}/>
              </div>
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
              {this.props.books.map((book,index)=>{
                    if (book.imageLinks) return <li key={book.id}><Book id={book.id} title={book.title} refreshBooks = {this.props.refreshBooks} author={book.authors} url={book.imageLinks.thumbnail}/></li>
                  })}</ol>
            </div>
  }
}


class SearchInput extends Component {
  constructor(props){
    super(props);
    this.state = {value:''}
    this.handleChange = this.handleChange.bind(this);
  }

  render(){
    
    return <input type="text" onChange={this.handleChange} value={this.state.value} placeholder="Search by title or author"/> 
  }

  handleChange(e){
   this.setState({value:e.target.value});
   this.props.updateResults(e);
  }


}


export default BooksApp
