import express from 'express';


export const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    const data = {
        state: 'error',
        message: 'Nurodyk konkretu API endpoint\'a',
    };
    return res.json(data);
});

apiRouter.get('/bank', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs užėjote į Giedrės Narvilaitės Banką.',
    };
    return res.json(data);
});

apiRouter.get('/bank/account', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs esate Giedrės Narvilaitės banke ir jame galite susikurti sąskatą.',
    };
    return res.json(data);
});

const users = [];

apiRouter.get('/bank/account', (req, res) => {
    return res.json(users);
});

apiRouter.post('/acount', (req, res) => {
    users.push(req.body.acount);

    return res.json({
        state: 'success',
        message: 'Vardas, pavardė ir gimimo data pridėta.',
    });
});