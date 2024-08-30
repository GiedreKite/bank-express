import express from 'express';


export const apiRouter = express.Router({mergeParams:true,});


export function get() {
    


const users = [];

apiRouter.get('/account', (req, res) => {
    return res.json(users);
});

}