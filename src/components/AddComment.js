import { useState } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted succesfully</h4>
          <Link to={"/movies/" + props.match.params.id}>Back to movie</Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={onChangeComment}
              value={comment}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveComment}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default AddComment;
