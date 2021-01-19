import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SaveBooks from "./pages/SaveBooks";
import SearchBooks from "./pages/SearchBooks";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer"
import "./App.css";
import io from "socket.io-client";

// Socket conn
export const socket = io(); //'http://localhost:3001');

function App() {
  return (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={SearchBooks} />
        <Route exact path="/saved" component={SaveBooks} />
        <Route exact path="/saved/:id" component={SaveBooks} />
        <Route component={NoMatch} /> 
      </Switch>
      <Footer />
    </div>
  </Router>
);
}

export default App;
