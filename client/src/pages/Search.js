
import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult"

function Search() {
    let history = useHistory();
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [url, setUrl] = useState(``);
    const [saved, setSaved] = useState(false);
  
    const handleSave = (bookData) => {
      API.saveBook(bookData)
        .then((res) => {
          // console.log(res); //retained for debugging
          setSaved(true);
          socket.emit("booksaved", bookData.title, bookData.authors);
          history.push("/saved");
        })
        .catch((err) => console.log(err));
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
        const result = await axios(url);
  
        const savedBooks = await API.getBooks();
        const savedBookIds = savedBooks.data.map((s) => s.bookid);
        result.data.items.map((element) => {
          if (savedBookIds.includes(element.id)) {
            element.alreadySaved = true;
            return { ...element };
          } else {
            element.alreadySaved = false;
            return { ...element };
          }
        });
        // console.log(result.data.items); //retained for debugging
        setItems(result.data.items);
      };
  
      fetchData();
  
      setSearchTerm("");
  
      // *** useEffect clean up method
      return () => {
        setUrl("");
      };
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