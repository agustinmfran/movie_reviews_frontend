import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import moment from "moment";

const Movie = (props, user) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    comments: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const deleteComment = (commentId, index) => {
    MovieDataService.deleteComment(commentId, props.user.id)
      .then((response) => {
        setMovie((prevState) => {
          prevState.comments.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  let poster = movie.poster;
  if (poster === undefined) {
    poster = "/noimage.png";
  }

  return (
    <section
      id="home"
      className="max-w-4xl mx-auto pt-24 md:pt-64 lg:pt-28 h-screen"
    >
      <div className="flex flex-col justify-center items-center md:flex-col lg:items-start lg:flex-row px-3">
        <div className="md:w-1/3 pr-4">
          <img
            src={poster}
            width={300}
            height={200}
            className="rounded-md"
            alt={movie.title}
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="font-bold text-5xl my-2">{movie.title}</h1>
          <p className="text-neutral-500 text-lg mt-4 mb-8">{movie.plot}</p>
          {props.user && (
            <Link
              to={"/movies/" + props.match.params.id + "/comments"}
              className="text-black font-semibold px-2 py-1 bg-yellow-300 rounded-sm shadow hover:bg-yellow-200 cursor-pointer"
            >
              Add review
            </Link>
          )}
          <h2 className="font-bold text-2xl pt-8 text-yellow-500">Reviews:</h2>
          {movie.comments.map((comment, index) => {
            return (
              <div key={index}>
                <h5>
                  {comment.name + " reviewed on "}
                  {moment(comment.date).format("Do MMMM YYYY")}
                  {":"}
                </h5>
                <p className="font-semibold text-xl">{comment.comment}</p>
                {props.user && props.user.id === comment.user_id && (
                  <div>
                    <Link
                      to={{
                        pathname:
                          "/movies/" + props.match.params.id + "/comments/",
                        state: { currentComment: comment },
                      }}
                      className="text-black text-xs font-semibold px-2 py-1 mt-4 bg-yellow-300 rounded-sm shadow hover:bg-yellow-200 cursor-pointer"
                    >
                      Edit
                    </Link>

                    <button
                      className="text-black text-xs font-semibold px-2 py-1 mt-4 ml-2 bg-red-400 rounded-sm shadow hover:bg-red-200 cursor-pointer"
                      onClick={() => deleteComment(comment._id, index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Movie;
