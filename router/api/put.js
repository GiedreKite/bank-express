import express from 'express';
import { nameCheck } from '../validations/nameCheck.js'
import {surnameCheck} from '../validations/surnameCheck.js';
import {yearOfBirthCheck} from '../validations/yearCheck.js';
import {monthOfBirthCheck} from '../validations/monthCheck.js';
import {dayOfBirthCheck} from '../validations/dayCheck.js';
import { users } from '../../data/users.js';

export const apiRouterPut = express.Router();

 {users} ;
     
     
 apiRouterPut.put('/:name-:surname', (req, res) => {
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

    if (Array.isArray(req.body)
        || req.body === null) {
        return res.json({
            status: 'error',
            message: 'Netinkamas duomenų tipas, turi būti objektas',
        });
}
    const newName = req.body;
    if(!("name" in newName)) {
        return res.json({
            status: 'error', 
            message: 'Vardas turi būti įrašytas'
    });
}
    const nameError = nameCheck(newName['name']);
    if (nameError !== '') {
        return res.json({
            status: 'error',
            message: nameError,
        });
}

const newSurname = req.body;
if(!("surname" in newSurname)) {
    return res.json({
        status: 'error', 
        message: 'Pavardė turi būti įrašytas'
});
}
const surnameError = surnameCheck(newSurname['surname']);
if (surnameError !== '') {
    return res.json({
        status: 'error',
        message: surnameError,
    });
}


const newYearOfBirth = req.body;
if(!("yearOfBirth" in newYearOfBirth)) {
return res.json({
    status: 'error', 
    message: 'Gimimo metai turi būti įrašyti'
});
}
const yearOfBirthError = yearOfBirthCheck(newYearOfBirth['yearOfBirth']);
if (yearOfBirthError !== '') {
return res.json({
    status: 'error',
    message: yearOfBirthError,
});
}
const newMonthOfBirth = req.body;
if(!("monthOfBirth" in newMonthOfBirth)) {
return res.json({
    status: 'error', 
    message:  'Gimimo mėnuo turi būti įrašyti'
});
}
const monthOfBirthError = monthOfBirthCheck(newMonthOfBirth['monthOfBirth']);
if (monthOfBirthError !== '') {
return res.json({
    status: 'error',
    message: monthOfBirthError,
});
}

const newDayOfBirth = req.body;
if(!("dayOfBirth" in newDayOfBirth)) {
return res.json({
    status: 'error', 
    message:  'Gimimo diena turi būti įrašyti'
});
}
const dayOfBirthError = dayOfBirthCheck(newDayOfBirth['dayOfBirth']);
if (dayOfBirthError !== '') {
return res.json({
    status: 'error',
    message: dayOfBirthError,
});
}
    user.dayOfBirth=newDayOfBirth['dayOfBirth'];
    user.monthOfBirth=newMonthOfBirth['monthOfBirth'];
    user.yearOfBirth=newYearOfBirth['yearOfBirth'];
    user.surname=newSurname['surname'];
    user.name=newName['name'];
    users.splice(index, 1);
    delete users[index]
    const newUserName=user.name+"-"+user.surname;
    users[newUserName]=user;      
  
    return res.json({
        state: 'success',
        message: 'Vartotojo duomenys atnaujinti.',
    });

});   




   
