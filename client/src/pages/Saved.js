  
import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Container} from "../components/Grid";
import SavedResult from "../components/SavedResult"

function Saved() {
    const [items, setItems] = useState([]);
    const [removed, setRemoved] = useState(false);
  
    useEffect(() => {
      setItems([]);    
      const fetchData = async () => {
        const savedBooks = await API.getBooks();
        // console.log(savedBooks.data) //retained for debugging
        setItems(savedBooks.data);
      };
  
      fetchData();
    }, [removed]);
  
    const handleRemove = (title, authors, id) => {    
      API.deleteBook(id)
        .then((res) => {
          console.log(res); //retained for debugging
          socket.emit("bookremoved", title, authors, id);
  
          setRemoved(true);
        })
        .catch((err) => console.log(err));
    };
    return (
        <Container fluid className="container">
            <Jumbotron />
            <Container>
                <SavedResult savedBooks={items} handleDeleteButton={handleRemove} />
            </Container>
        </Container>
    )
}
export default Saved;