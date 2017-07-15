import React from 'react';
import { Component } from 'react';


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


export default SearchInput