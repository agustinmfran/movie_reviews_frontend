import { Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Movie from "./components/Movie";
import MovieList from "./components/MovieList";
import Login from "./components/Login";
import AddComment from "./components/AddComment";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  return (
    <div className="App">
      {/* <Header /> */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={"/movies"}>Movies</Link>
              </Nav.Link>
              <Nav.Link>
                {user ? (
                  <a href="/" onClick={logout}>
                    Logout user
                  </a>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/movies"]} component={MovieList} />
        <Route
          path="/movies/:id/comments"
          render={(props) => <AddComment {...props} user={user} />}
        />
        <Route
          path="/movies/:id"
          render={(props) => <Movie {...props} user={user} />}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
