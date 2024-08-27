import express from 'express';


export const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    const data = {
        state: 'error',
        message: 'Nurodyk konkretu API endpoint\'a',
    };
    return res.json(data);
});

apiRouter.get('/bankas', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs užėjote į banką.',
    };
    return res.json(data);
});