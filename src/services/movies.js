import axios from "axios";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(
      `https://movies-reviews-backend.vercel.app/api/v1/movies?page=${page}`
    );
  }

  get(id) {
    return axios.get(
      `https://movies-reviews-backend.vercel.app/api/v1/movies/id/${id}`
    );
  }

  find(query, by = "title", page = 0) {
    return axios.get(
      `https://movies-reviews-backend.vercel.app/api/v1/movies?${by}=${query}&page=${page}`
    );
  }

  createComment(data) {
    return axios.post(
      "hhttps://movies-reviews-backend.vercel.app/api/v1/movies/comments",
      data
    );
  }

  updateComment(data) {
    return axios.put(
      "https://movies-reviews-backend.vercel.app/api/v1/movies/comments",
      data
    );
  }

  deleteComment(id, userId) {
    return axios.delete(
      "https://movies-reviews-backend.vercel.app/api/v1/movies/comments",
      {
        data: { comment_id: id, user_id: userId },
      }
    );
  }

  getRatings() {
    return axios.get(
      "https://movies-reviews-backend.vercel.app/api/v1/movies/ratings"
    );
  }
}

export default new MovieDataService();
