import React from 'react'
import { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'



class BooksApp extends Component {
 
  render() {
    return (
      <div className="app">

      <Route path="/search"  component={SearchPage}/>

        <Route path="/" exact render={()=>(
          <div className="list-books">
            <TitleBar/>
            <div className="list-books-content">
              <div>
                <BookShelf label="Currently Reading" books={[{title:"To Kill a Mockingbird",author:"Harper Lee",url:"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"},{title:"Ender's Game",author:"Orson Scott Card",url:"http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"}]}/>
                <BookShelf label="Want to Read" books={[{title:"1776",author:"David McCullough",url:"http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"},{title:"Harry Potter and the Sorcerer's Stone",author:"J.K. Rowling",url:"http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"}]}/>
                <BookShelf label="Read" books={[{title:"The Hobbit",author:"J.R.R. Tolkien",url:"http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"},{title:"Oh, the Places You'll Go",author:"Seuss",url:"http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"},{title:'The Adventures of Tom Sawyer',author:'Mark Twain',url:'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api'}]}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )}/>
      </div>
    )
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
                    return <li key={index}><Book label={this.props.label} title={book.title} author={book.author} url={book.url}/></li>
                  })}
                  </ol>
              </div>
            </div>
  }
}

class Book extends Component {


  

  render() {

    return  <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})`}}></div>
                    <BookShelfChanger label={this.props.label}/>
                  </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.author}</div>
              </div>      
  }
}

class BookShelfChanger extends Component {

  constructor(props){



    super(props);
    this.state = {
      value:this.getOptionValue(this.props.label)
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.getOptionValue = this.getOptionValue.bind(this);

  }

  handleChange(event) {
      this.setState({value:event.target.value});
      
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
              <select value={this.state.value} onChange={this.handleChange}>
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
    this.state = {books:[]};
  }

  componentDidMount(){
    BooksAPI.search('android',10).then((books)=>this.setState({books}))
    
  }

  render(){
    return   <div className="search-books">
            <SearchBar/>
            <SearchResults books={this.state.books}/>
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
                <input type="text" placeholder="Search by title or author"/>
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
                    console.log(book.imageLinks.thumbnail); 
                    return <li key={index}><Book title={book.title} author={book.authors} url={book.imageLinks.thumbnail}/></li>
                  })}</ol>
            </div>
  }
}



export default BooksApp
