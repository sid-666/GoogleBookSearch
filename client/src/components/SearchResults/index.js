
import React from "react";
import "./style.css";
import { Row, Col } from "../Grid"

const SearchResult = props => {
    console.log(props.books);
    return (props.books.length === 0) ? (
        <div className="card">
            <div className="card-body player">
                <div className="article">
                    <h3>Search Results</h3>
                </div>
            </div>
        </div>
    ) : (
            <div className="card">
                <div className="card-body player">
                    <div className="article">
                        <h3>Search Results</h3>
                        {props.books.map((book, index) => {
                            console.log("This is a book", book)
                            return (
                                <li className="search-list list-group-item" key={book.id}>
                                    <Row className="SearchResult row" id={book.title + "Card"}>
                                        {/* col-3 show image of the book */}
                                        <Col size="2" className="bookImage">
                                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                                        </Col>
                                        <Col size="1" className="emptyCol" />
                                        {/* col-9 show information of the book */}
                                        <Col size="9" className="bookInfo">
                                            <Row>
                                                <h3 className="bookTitle">{book.volumeInfo.title}</h3>
                                            </Row>
                                            <Row>
                                                <h4 className="bookAuthor">{book.volumeInfo.author}</h4>
                                            </Row>
                                            <Row>
                                                <p className="bookDescription">{book.volumeInfo.description}</p>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row className="buttonDiv ">
                                        <button className="saveBook btn btn-primary" id={book.id} onClick={(event) => props.handleSavedButton(book)}>
                                            Save Book
                                        </button>
                                        <a href={book.link} target="_blank">
                                            <button className="viewBook btn btn-success">
                                                View Book
                                        </button>
                                        </a>
                                    </Row>
                                </li>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
}
export default SearchResult