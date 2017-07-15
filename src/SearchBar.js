import React from 'react';
import { Component } from 'react';
import SearchInput from './SearchInput.js'
import {Link, Route} from 'react-router-dom';


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




export default SearchBar