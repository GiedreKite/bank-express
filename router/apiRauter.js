import express from 'express';
import {nameCheck} from './validations/nameCheck.js';
import {surnameCheck} from './validations/surnameCheck.js';
import {yearOfBirthCheck} from './validations/yearCheck.js';
import {monthOfBirthCheck} from './validations/monthCheck.js';
import {dayOfBirthCheck} from './validations/dayCheck.js';

export const apiRouter = express.Router({mergeParams:true,});



apiRouter.get('/bank', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs užėjote į Giedrės Narvilaitės Banką.',
    };
    return res.json(data);
});


const users = [];

apiRouter.get('/account', (req, res) => {



return res.json(users);
});

apiRouter.post('/account', (req, res) => {
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
   
    // users.push(req.body);
    users[req.body.name+'-'+req.body.surname]=req.body;
    console.log(JSON.stringify(users))
    console.log(req.body)
    console.log(users)
    

    //post - body

    // get - params



   
    return res.json({
        state: 'success',
        message: 'Vardas, pavardė ir gimimo data pridėta.',
    });

});


apiRouter.get('/account/:name-:surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const userName = name+'-'+surname
    console.log(userName)
    console.log(name+'-'+surname)
    console.log(users)
    let user = null;

    for (const key in users) {
        if (key.name+'-'+key.surname === userName) {
            user = key;
            break;
        }
    }

    if (user) {
        return res.send(`Vartotojo vardas ${users.name}, pavardė ${users.surname} ir jis yra gimęs  ${users.yearOfBirth} metais, ${users.monthOfBirth} mėnesį ir ${users.dayOfBirth} dieną`);
    } else {
        return res.send(`Vartotojo, vardu ${req.params.name} nera.`);
    }
  
});

        //TODO: Padaryti tikrinima visu esamu users
        // if(name+surname === name+surname){
        //     return res.json({
        //         state: 'error',
        //         message: 'Vardas ir pavardė jau užregistruoti, negali kartotis. ',
        //     });
        // }
