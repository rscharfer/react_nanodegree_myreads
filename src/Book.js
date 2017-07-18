import React from 'react';
import { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelfChanger from './BookShelfChanger.js'

class Book extends Component {

  constructor(props){
    super(props);
    this.state = {shelf:''};
    this.changeShelf = this.changeShelf.bind(this)
  }

  changeShelf(newShelf){

    this.setState({shelf:newShelf});
    BooksAPI.update({id:this.props.id},newShelf).then(()=>this.props.refreshBooks());

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


export default Book