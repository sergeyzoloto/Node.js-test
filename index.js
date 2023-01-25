import router from './routes/movies.js';
import express from 'express';

const PORT = 3000;
const app = express();

// Parse JSON using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movie', router);

// Set the server to listen at port
app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
