import express from 'express';
import { users } from '../../data/users.js';

export const apiRouterDelete = express.Router();

 {users} ;

apiRouterDelete.delete('/:name-:surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const userName = name+'-'+surname;
   
   
    let index = null;
    let user = null;
  


    for (const key in users) {
        if (key.toLowerCase() === userName.toLowerCase()) {
            user = users[key];
            index = key;
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

    const balanceObj = user.balance;
    console.log(balanceObj);

    if (balanceObj !== 0 ) {
        return res.json({
            state: 'error',
            message: 'Sąskaitoje negali būti pinigų, jei norite ją ištrinti.',
        });
    }
   

    users.splice(index, 1);
    delete users[index];

    return res.json({
        state: 'success',
        message: 'Vartotojas ištrintas',
    });
});

