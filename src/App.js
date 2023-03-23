import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import MovieList from "./components/MovieList";
import Login from "./components/Login";
import AddComment from "./components/AddComment";
import Movie from "./components/Movie";
import Footer from "./components/Footer";
import { Link as Rslink } from "react-scroll/modules";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";

function App() {
  const [user, setUser] = useState(null);
  const [navbar, setNavbar] = useState(false);
  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }

  return (
    <>
      <header className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50 shadow bg-white ">
        <div className="justify-between md:items-center md:flex">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Rslink
                to="home"
                className="cursor-pointer"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                <div className="container flex items-center space-x-2">
                  <h2 className="text-2xl font-bold rounded border-b-4 border-yellow-300">
                    Movie Reviews
                  </h2>
                  <img src="/movie_icon.png" alt="logo" className="w-10 h-10" />
                </div>
              </Rslink>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <Link
                  to="/movies"
                  className="block lg:inline-block text-neutral-900 font-bold hover:text-lg hover:text-yellow-300 hover:transition duration-300 cursor-pointer"
                  onClick={() => setNavbar(!navbar)}
                >
                  Movies
                </Link>
                {user ? (
                  <a
                    className="block lg:inline-block text-neutral-900 font-bold hover:text-lg hover:text-yellow-300 hover:transition duration-300 cursor-pointer"
                    href="/"
                    onClick={logout && (() => setNavbar(!navbar))}
                  >
                    Logout user
                  </a>
                ) : (
                  <Link
                    to={"/login"}
                    className="block lg:inline-block text-neutral-900 font-bold hover:text-lg hover:text-yellow-300 hover:transition duration-300 cursor-pointer"
                    onClick={() => setNavbar(!navbar)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-7xl">
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
      </main>
      <Footer />
    </>
  );
}

export default App;
