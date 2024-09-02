import express from 'express';
import { users } from '../../data/users.js';

export const apiRouterPostDeposit = express.Router();

 {users} ;

 apiRouterPostDeposit.post('/', (req, res) => {

    const name = req.body.name.toLowerCase();
    const surname = req.body.surname.toLowerCase();
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
    if (!("name" in req.body)) {
        return res.json({
            status: "error",
            message: "Nepateiktas vardas."
        });
    }

    if (!("surname" in req.body)) {
        return res.json({
            status: "error",
            message: "Nepateikta pavardė."
        });
    }


    
    if (!("addMoney" in req.body) || req.body.addMoney <= 0) {
        return res.json({
            status: "error",
            message: "Nepateikta pinigų suma."
        });
    }

    if (user === null) {
        return res.json({
            status: "error",
            message: "Vartotojas nerastas."
        });
    }

    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null) {
        return res.json({
            status: 'error',
            message: 'Netinkamas duomenų tipas, turi būti objektas',
        });
}
user.balance+=req.body.addMoney
users[index]=user

   
return res.json({
    state: 'success',
    message: `Įnešta pinigų suma, likutis sąskaitoje: ${user.balance/100} Eur.`,
});


})