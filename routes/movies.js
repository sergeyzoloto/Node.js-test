import {
  getAllMovies,
  addMovie,
  findMovie,
  deleteMovie,
} from '../controllers/movies.js';

import express from 'express';
const router = express.Router();

// Get the movie list in the JSON form
router.get('/', getAllMovies);

// Search for a movie in the list
router.get('/:id', findMovie);

// Add a movie to the list
router.post('/', addMovie);

// Remove a movie from the list
router.delete('/:id', deleteMovie);

export default router;
