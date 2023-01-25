import { v4 } from 'uuid';

import { data } from '../data.js';
let movies = data;

export const getAllMovies = (req, res) => {
  res.status(200).json({ serverMessage: 'OK', movies: movies });
};

export const addMovie = (req, res) => {
  const { title, director, release_date } = req.body;
  if (title && director && release_date) {
    const id = v4(); // unique id generator
    movies.push({ id, title, director, release_date });
    res.status(200).json({
      serverMessage: 'Movie added',
      id: id,
    });
  } else {
    // Error message contains missed fields
    res.status(400).json({
      serverMessage: `ERROR. Please make sure your request contains JSON with fields:${
        title ? '' : 'title '
      } ${director ? '' : 'director '}${release_date ? '' : 'release_date'}`,
    });
  }
};

export const findMovie = (req, res) => {
  const id = req.params.id;

  for (let movie of movies) {
    if (movie.id === id) {
      res.status(200).json(movie);
      return;
    }
  }
  res.status(404).send({ serverMessage: 'ERROR 404: Movie is not found' });
};

export const deleteMovie = (req, res) => {
  const id = req.params.id;
  const ids = movies.map((movie) => {
    return movie.id;
  });

  if (ids.includes(id)) {
    const filteredMovies = movies.filter((movie) => {
      if (movie.id !== id) {
        return true;
      } else {
        return false;
      }
    });
    movies = filteredMovies;
    res.status(200).send({ serverMessage: 'Movie deleted' });
  } else {
    res.status(400).send({ serverMessage: 'ERROR: Movie is not found!' });
  }
};
