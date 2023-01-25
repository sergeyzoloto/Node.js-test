import { data } from '../data.js';
let movies = data;

export const getAllMovies = (req, res) => {
  res.status(200).json(movies);
};

export const addMovie = (req, res) => {
  const movie = req.body;
  movies.push(movie);
  res.status(200).send('Movie is added to the list');
};

export const findMovie = (req, res) => {
  const id = req.params.id;

  for (let movie of movies) {
    if (movie.id === id) {
      res.status(200).json(movie);
      return;
    }
  }

  res.status(404).send('Movie is not found');
};

export const deleteMovie = (req, res) => {
  const id = req.params.id;
  const filteredMovies = movies.filter((movie) => {
    if (movie.id !== id) {
      return true;
    } else {
      return false;
    }
  });
  movies = filteredMovies;

  res.status(200).send('Movie is deleted');
};
