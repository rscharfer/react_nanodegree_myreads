import React from 'react';
import { Component } from 'react';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js'
import * as BooksAPI from './BooksAPI';



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



export default SearchPage