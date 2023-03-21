import { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

function Movie(props) {
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
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={poster} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/comments"}>
                    Add review
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br />
            <h2>Reviews</h2>
            {movie.comments.map((comment, index) => {
              return (
                <Card key={index}>
                  <Card.Body>
                    <h5>
                      {comment.name + " reviewed on "}
                      {moment(comment.date).format("Do MMMM YYYY")}
                    </h5>
                    <p>{comment.comment}</p>
                    {props.user && props.user.id === comment.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={{
                              pathname:
                                "/movies/" +
                                props.match.params.id +
                                "/comments/",
                              state: { currentComment: comment },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteComment(comment._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Movie;
