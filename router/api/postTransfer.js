import express from 'express';
import { users } from '../../data/users.js';

export const apiRouterPostTransfer = express.Router();

 {users} ;


 apiRouterPostTransfer.post('/', (req, res) => {

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
            message: "Nepateiktas pavardė."
        });
    }

    
    const nameReceiver = req.body.nameReceiver.toLowerCase();
    const surnameReceiver = req.body.surnameReceiver.toLowerCase();
    const userNameReceiver = nameReceiver+'-'+surnameReceiver;

    let indexReceiver = null;
    let userReceiver = null;
  

 

    for (const key in users) {
        if (key.toLowerCase() === userNameReceiver.toLowerCase()) {
            userReceiver = users[key];
            indexReceiver = key;
            console.log(userReceiver);
            break;
        }
    }
    if (!("nameReceiver" in req.body)) {
        return res.json({
            status: "error",
            message: "Nepateiktas vardas."
        });
    }

    if (!("surnameReceiver" in req.body)) {
        return res.json({
            status: "error",
            message: "Nepateiktas pavardė."
        });
    }


    
    if (!("transfer" in req.body) || req.body.transfer <= 0 || req.body.transfer > user.balance) {
        return res.json({
            status: "error",
            message: "Nepateikta tinkama pinigų suma."
        });
    }

    if (userReceiver === null) {
        return res.json({
            status: "error",
            message: "Vartotojas gavėjas nerastas."
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
    console.log("T")
    console.log(userReceiver)
    console.log(user)
user.balance-=req.body.transfer
users[index]=user
userReceiver.balance+=req.body.transfer
users[indexReceiver]=userReceiver
   
console.log(userReceiver)
console.log(user)
return res.json({
    state: 'success',
    message: `Įnešta pinigų suma, likutis sąskaitoje: ${user.balance/100} Eur.`,
});


})