import { useState } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

function AddComment(props) {
  let editing = false;
  let initialCommentState = "";
  if (props.location.state && props.location.state.currentComment) {
    editing = true;
    initialCommentState = props.location.state.currentComment.comment;
  }
  const [comment, setComment] = useState(initialCommentState);
  const [submitted, setSubmitted] = useState(false);
  const onChangeComment = (e) => {
    const comment = e.target.value;
    setComment(comment);
  };
  const saveComment = () => {
    var data = {
      comment: comment,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: props.match.params.id,
    };
    if (editing) {
      data.comment_id = props.location.state.currentComment._id;
      MovieDataService.updateComment(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createComment(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center h-screen"
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center">
          <h4 className="font-bold pb-4">Review submitted succesfully</h4>
          <Link
            to={"/movies/" + props.match.params.id}
            className="text-black font-semibold px-2 py-1 bg-yellow-300 rounded-sm shadow hover:bg-yellow-200 cursor-pointer"
          >
            Back to movie
          </Link>
        </div>
      ) : (
        <form className="flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <label className="font-bold pr-4">
              {editing ? "Edit" : "Create"} Review
            </label>
            <input
              className="shadow-lg border-2 rounded pl-2"
              type="text"
              onChange={onChangeComment}
              value={comment}
            />
          </div>
          <button
            className="text-black font-semibold px-2 py-1 mt-4 bg-yellow-300 rounded-sm shadow hover:bg-yellow-200 cursor-pointer"
            onClick={saveComment}
            type="button"
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
}

export default AddComment;
