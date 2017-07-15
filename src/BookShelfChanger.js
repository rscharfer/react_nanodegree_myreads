import React from 'react';
import { Component } from 'react';




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


export default BookShelfChanger