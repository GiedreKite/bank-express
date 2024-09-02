import express from 'express';
import { users } from '../../data/users.js';

export const apiRouterPostWithdrow = express.Router();

 {users} ;

 apiRouterPostWithdrow.post('/', (req, res) => {

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
            message: "Nepateiktrdas vardas."
        });
    }

    if (!("surname" in req.body)) {
        return res.json({
            status: "error",
            message: "Nepateikta pavardė."
        });
    }


    
    if (!("withdrawMoney" in req.body)) {
        return res.json({
            status: "error",
            message: "Nepateiktas išimamas kiekis."
        });
    }
    if (req.body.withdrawMoney <= 0) {
        return res.json({
            status: "error",
            message: "Nepateikta tinkama pinigų suma."
        });
    }
    if (req.body.withdrawMoney > user.balance) {
        return res.json({
            status: "error",
            message: "Negalima išimti daugiau nei yra sąskaitoje."
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
user.balance-=req.body.withdrawMoney 
users[index]=user

   
return res.json({
    state: 'success',
    message: `Išimta pinigų suma, likutis sąskaitoje: ${user.balance/100} Eur.`,
});


})
