import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import Card from "./Card";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveRatings();
  }, []);

  useEffect(() => {
    retrieveNextPage();
  }, [currentPage]);

  const retrieveNextPage = () => {
    if (currentSearchMode === "findByTitle") {
      findByTitle();
    } else if (currentSearchMode === "findByRating") {
      findByRating();
    } else retrieveMovies();
  };

  const retrieveMovies = () => {
    setCurrentSearchMode("");
    MovieDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const find = (query, by) => {
    MovieDataService.find(query, by, currentPage)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  };

  const findByRating = () => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <section id="home" className="flex-col justify-center items-center">
      <form className="flex flex-col md:flex-row pt-24 pb-20 ">
        <div className="pb-4 pl-2 md:pr-8">
          <input
            className="outline-none text-lg border-b-2"
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />

          <button
            className="text-black font-semibold px-2 py-1 bg-yellow-300 rounded-sm shadow hover:bg-yellow-200 cursor-pointer"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
        <div>
          <select
            className="px-2 py-1 rounded font-bold hover:border-yellow-300 hover:border-2 focus:outline-none cursor-pointer"
            onChange={onChangeSearchRating}
            onClick={findByRating}
          >
            {ratings.map((rating, index) => {
              return (
                <option value={rating} key={index}>
                  {rating}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie, index) => {
          let poster = movie.poster;
          if (poster === undefined) {
            poster = "/noimage.png";
          }
          return <Card key={index} movie={movie} />;
        })}
      </div>
      <div className="flex flex-row items-center justify-between pt-8 font-bold">
        <div>Page {currentPage + 1}</div>
        <button
          className="text-black font-semibold px-2 py-1 bg-yellow-300 rounded-sm shadow hover:bg-yellow-200 cursor-pointer"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Get next {entriesPerPage} results
        </button>
      </div>
    </section>
  );
};

export default MovieList;
