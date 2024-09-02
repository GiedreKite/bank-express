import express from 'express';
import { users } from '../../data/users.js';

export const apiRouterGetName = express.Router();

 {users} ;


 apiRouterGetName.get('/:name-:surname/:name', (req, res) => {
    const name = req.body.name.toLowerCase();
    const surname = req.body.surname.toLowerCase();
    const userName = name+'-'+surname;
    let user = null;

    for (const key in users) {

        if (key.toLowerCase() === userName.toLowerCase()) {
            user = users[key];
            console.log(user);
            break;
        }
    }

        if (user === null) {
        return res.json({
            status: "error",
            message: "Vartotojas nerastas."
        });
    }

    return res.json({
        state: 'success',
        message: `Vartotojo vardas ${userName}`,
    });

});