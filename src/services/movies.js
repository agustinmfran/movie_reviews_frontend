import axios from "axios";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`);
  }

  get(id) {
    return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return axios.get(
      `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`
    );
  }

  createComment(data) {
    return axios.post("http://localhost:5000/api/v1/movies/comments", data);
  }

  updateComment(data) {
    return axios.put("http://localhost:5000/api/v1/movies/comments", data);
  }

  deleteComment(id, userId) {
    return axios.delete("http://localhost:5000/api/v1/movies/comments", {
      data: { comment_id: id, user_id: userId },
    });
  }

  getRatings() {
    return axios.get("http://localhost:5000/api/v1/movies/ratings");
  }
}

export default new MovieDataService();
