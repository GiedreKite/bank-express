import express from 'express';
import { nameCheck } from '../validations/nameCheck.js'
import {surnameCheck} from '../validations/surnameCheck.js';
import {yearOfBirthCheck} from '../validations/yearCheck.js';
import {monthOfBirthCheck} from '../validations/monthCheck.js';
import {dayOfBirthCheck} from '../validations/dayCheck.js';


export const apiRouterPost = express.Router();

const users = [];

apiRouterPost.post('/', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const yearOfBirth = req.body.yearOfBirth;
    const monthOfBirth = req.body.monthOfBirth;
    const dayOfBirth = req.body.dayOfBirth;
    const balance = req.body.balance;

    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null) {
        return res.json({
            status: 'error',
            message: 'Netinkamas duomenų tipas, turi būti objektas',
        });
}
if (name === surname) {
    errorMessage = 'Vardas ir pavardė negali sutapti';}
// if ((name+'-'+surname) === (users.name+'-'+users.surname)) {
//     return res.json({
//         status: 'error',
//         message:' Vartotojas jau yra užregistruotas',
//     });

// }
    const nameError = nameCheck(name);
    if (nameError !== '') {
        return res.json({
            status: 'error',
            message: nameError,
        });
}
const surnameError = surnameCheck(surname);
if (surnameError !== '') {
    return res.json({
        status: 'error',
        message: surnameError,
    });
}
const yearOfBirthError = yearOfBirthCheck(yearOfBirth);
if (yearOfBirthError !== '') {
    return res.json({
        status: 'error',
        message: yearOfBirthError,
    });
}
const monthOfBirthError = monthOfBirthCheck(monthOfBirth);
if (monthOfBirthError !== '') {
    return res.json({
        status: 'error',
        message: monthOfBirthError,
    });
}
const dayOfBirthError = dayOfBirthCheck(dayOfBirth);
if (dayOfBirthError !== '') {
    return res.json({
        status: 'error',
        message: dayOfBirthError,
    });
}

const date = new Date();
const y = date.getFullYear();
const m = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
const d = date.getDate();
// const alowedDay = (year, month) => new Date(year, month, 0).getDate(yearOfBirth, monthOfBirth);

        
// if(!alowedDay>dayOfBirth){
//     return res.json({
//         state: 'error',
//         message: 'Mėnuo neturi tokios dienos.',
//     });
// }

        if(yearOfBirth >= y-18 && monthOfBirth >= m && dayOfBirth> d){
            return res.json({
                state: 'error',
                message: 'Nepilnametis negali susikurti sąskaitos banke',
            });
        }
   

        if (balance !== 0) {
            return res.json({
                status: 'error',
                message: 'Sukuriant sąskaitą, sąskaitos balansas turi būti lygus 0',
            });
        }
    users[req.body.name+'-'+req.body.surname]=req.body;
    console.log(JSON.stringify(users))
    console.log(req.body)
    console.log(users)
    
    return res.json({
        state: 'success',
        message: 'Vardas, pavardė ir gimimo data pridėta.',
    });

});

    
    