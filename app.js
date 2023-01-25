import router from './routes/movies.js';
import express from 'express';

const app = express();

// Parse JSON using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movie', router);

export default app;
