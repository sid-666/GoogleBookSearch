
import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResults";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Search() {
    let history = useHistory();
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [url, setUrl] = useState(`https://books.googleapis.com/books/v1/volumes?q=Harry Potter&key=AIzaSyCT4ndO_FO6f72PXHqey5q-SOSGNb7aS0U`);
    const [saved, setSaved] = useState(false);

    const handleSave = (bookData) => {
        console.log("Book data", bookData)
        const checkData = async () => {
            const bookdbdata = await API.getBooks();
            const samebook = bookdbdata.data.map((s) => s.title);
            if (samebook.includes(bookData.volumeInfo.title)) {
                alert("You have this book")
            } else {
                API.saveBook({
                    title: bookData.volumeInfo.title,
                    authors: bookData.volumeInfo.authors,
                    description: bookData.volumeInfo.description,
                    image: bookData.volumeInfo.imageLinks.thumbnail,
                    link: bookData.volumeInfo.infoLink
                })
                    .then((res) => {
                        // console.log(res); //retained for debugging
                        history.push("/saved");
                    })
                    .catch((err) => console.log(err));
            }
        }
        checkData();
    };

    function handleSearch(event) {
        event.preventDefault();
        setUrl(
            `https://books.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCT4ndO_FO6f72PXHqey5q-SOSGNb7aS0U`
        );
    }

    useEffect(() => {
        setItems([]);
        console.log("I am in useeffect");
        const fetchData = async () => {
            const result = await axios.get(url);
            console.log(url);
            console.log(result);
            console.log(result.data.items); //retained for debugging
            setItems(result.data.items);
        };

        fetchData();

        setSearchTerm("");

        // *** useEffect clean up method
    }, [url, saved]);

    return (
        <Container fluid>
            <Jumbotron>
                <h1 className="text-white">Find Your Favorite Books with GoogleBook API</h1>
            </Jumbotron>
            <Container>
                <Row>
                    <Col size="12">
                        <SearchForm
                            handleFormSubmit={handleSearch}
                            search={searchTerm}
                            handleInputValue={(e) => setSearchTerm(e.target.value)}
                        />
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container>
                <SearchResult books={items} handleSavedButton={handleSave} />
            </Container>
        </Container>
    );
}

export default Search;