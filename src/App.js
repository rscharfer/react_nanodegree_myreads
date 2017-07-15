import React from 'react';
import { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book.js'



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
                    return <li key={book.id}><Book id={book.id} refreshBooks = {this.props.refreshBooks} label={this.props.label} title={book.title} author={book.authors} url={book.imageLinks.thumbnail}/></li>
                  })}
                  </ol>
              </div>
            </div>
  }
}



class BookShelfChanger extends Component {

  constructor(props){



    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selectValue:this.props.label}
  

  }

  handleChange(event) {
      this.props.changeShelf(event.target.value);
      this.setState({selectValue:event.target.value})

      
    }



  render () {

    return  <div className="book-shelf-changer">
              <select value= {this.state.selectValue} onChange={this.handleChange}>
                <option value="moveTo" disabled>Move to...</option>
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
              {Array.isArray(this.props.books)&&this.props.books.map((book,index)=>{
                   
                    if (book.imageLinks) return <li key={book.id}><Book id={book.id} title={book.title} refreshBooks = {this.props.refreshBooks} author={book.authors} label={book.shelf} url={book.imageLinks.thumbnail}/></li>
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
   this.props.updateResults(e.target.value);
  }


}


export default BooksApp
