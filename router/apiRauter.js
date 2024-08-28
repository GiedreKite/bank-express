import express from 'express';


export const apiRouter = express.Router();



apiRouter.get('/', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs užėjote į Giedrės Narvilaitės Banką.',
    };
    return res.json(data);
});


const users = [];

apiRouter.get('/account', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs užėjote į Giedrės Narvilaitės Banką.',
    };
    return res.json(data);
});

apiRouter.post('/account', (req, res) => {
    users.push(req.body.account);

    return res.json({
        state: 'success',
        message: 'Vardas, pavardė ir gimimo data pridėta.',
    });
});