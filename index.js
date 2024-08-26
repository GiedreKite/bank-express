import express from 'express';
import { apiRouter } from './router/apiRouter';

const app = express();
const port = 5033;

app.use('/api',apiRouter);

app.get('*', (req, res) => {
    return res.send('Ups... 404 page 🛸');
});

app.listen(port, () => {
    console.log(`Serveris pasileido: http://localhost:${port}`);
});