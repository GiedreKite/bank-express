import express from 'express';
import {nameCheck} from './validations/nameCheck.js';
import {surnameCheck} from './validations/surnameCheck.js';
import {yearOfBirthCheck} from './validations/yearCheck.js';
import {monthOfBirthCheck} from './validations/monthCheck.js';
import {dayOfBirthCheck} from './validations/dayCheck.js';
import { apiRouterPost } from './api/post.js';
import { users } from '../data/users.js';
import { apiRouterGet } from './api/get.js';
import { apiRouterDelete } from './api/delete.js';
import { apiRouterPostDeposit } from './api/postDeposit.js';
import { apiRouterPostWithdrow } from './api/postWithdraw.js';
import { apiRouterPostTransfer } from './api/postTransfer.js';

apiRouterPostTransfer
// import { apiRouterGetName } from './api/getName.js';




export const apiRouter = express.Router();

apiRouter.use('/account', apiRouterPost);

apiRouter.use('/account', apiRouterGet);

apiRouter.use('/account', apiRouterDelete);

apiRouter.use('/deposit', apiRouterPostDeposit);

apiRouter.use('/withdrow', apiRouterPostWithdrow);

apiRouter.use('/transfer', apiRouterPostTransfer);

// apiRouter.use('/account', apiRouterGetName);


{users}
apiRouter.get('/bank', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs užėjote į Giedrės Narvilaitės Banką.',
    };
    return res.json(data);
});









        //TODO: Padaryti tikrinima visu esamu users
        // if(name+surname === name+surname){
        //     return res.json({
        //         state: 'error',
        //         message: 'Vardas ir pavardė jau užregistruoti, negali kartotis. ',
        //     });
        // }

        
    //post - body


    apiRouter.put('/account/:name-:surname/name', (req, res) => {
        // const newName = req.body.newName
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
        const newData = req.body;
        if(!("name" in newData)) {
            return res.json({
                status: 'error', 
                message: 'Vardas turi būti įrašytas'
        });
    }
        const nameError = nameCheck(newData['name']);
        if (nameError !== '') {
            return res.json({
                status: 'error',
                message: nameError,
            });
    }
        user.name=newData['name'];
        users.splice(index, 1);
        delete users[index]
        const newUserName=user.name+"-"+user.surname;
        users[newUserName]=user;      
      
        return res.json({
            state: 'success',
            message: 'Vardas pakeistas.',
        });
    
    });   

    apiRouter.put('/account/:name-:surname', (req, res) => {
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
            message: 'Vardas pakeistas.',
        });
    
    });   


  
     
    
       
  
    

apiRouter.get('/account/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const names = Object.values(users).map(user => userName);
    console.log(userName);
    console.log(names);
    console.log(names[0])

    let user = null;

    for (const key in users) {
        if (key.name+'-'+key.surname === userName) {
            user = key;
            break;
        }
    }
 
    console.log(users.name)
    console.log({users}.name)
    console.log(users)

    const data = users;
    const nameObj = data['Giedrė-Narvilaitė'].name;
    
    console.log(nameObj);
   
      
    if (names[0] === userName) {
return res.send(`Vartotojo vardas pakeistas į ${nameObj}`);
    } else {
        return res.send(`Vartotojo, vardu ${req.params.name} nera.`);
    }
   
  
});

