import React from 'react';
import { Component } from 'react';
import debounce from 'lodash/fp/debounce.js'


class SearchInput extends Component {
  constructor(props){
    super(props);
    
    this.handleChange = this.handleChange.bind(this);

    this.delayedCallback = debounce(500,(v)=>{this.props.updateResults(v);})
  }

  render(){
    
    return <input type="text" onChange={this.handleChange} placeholder="Search by title or author"/> 
  }

  // componentWillMount(){

  //   this.delayedCallback = debounce(500,(v)=>{this.props.updateResults(v);})

  // }

  handleChange(e){
   e.persist();
   this.delayedCallback(e.target.value)
   
  }


}


export default SearchInput