import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  let poster = movie.poster;
  if (poster === undefined) {
    poster = "/noimage.png";
  }
  return (
    <div className="bg-white shadow-xl rounded-md">
      <img
        src={poster}
        className="rounded-t-md w-full h-2/3"
        alt={movie.title}
      />
      <div className="flex flex-col justify-between px-6 py-2 h-1/3">
        <div>
          <div className="font-bold text-xl mb-1">{movie.title}</div>
          <p className="text-gray-700 text-base mb-1">
            <span className="font-bold">Rated: </span>
            {movie.rated}
          </p>
        </div>
        <Link
          to={"/movies/" + movie._id}
          className="text-yellow-500 italic font-bold"
        >
          View Reviews
        </Link>
      </div>
    </div>
  );
};

export default Card;
