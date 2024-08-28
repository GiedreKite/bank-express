import express from 'express';
import { apiRouter  } from './router/apiRauter.js';

const app = express();
const port = 5033;

app.use(express.json()) 
// for parsing application/json
app.use(express.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded


app.use('/api',apiRouter);
app.use('/api/acount',apiRouter);
app.use('/api',apiRouter);

app.get('*', (req, res) => {
    return res.send('Ups... 404 page 🛸');
});


app.listen(port, () => {
    console.log(`Serveris pasileido: http://localhost:${port}`);
});