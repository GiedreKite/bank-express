import express from 'express';
import {nameCheck} from './validations/nameCheck.js'

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


        //TODO: Padaryti tikrinima visu esamu users
        // if(name+surname === name+surname){
        //     return res.json({
        //         state: 'error',
        //         message: 'Vardas ir pavardė jau užregistruoti, negali kartotis. ',
        //     });
        // }
        
        if(surname === ''){
            return res.json({
                state: 'error',
                message: 'Parardė turi būti įrašyta',
            });
        }
        if(yearOfBirth >= 2006){
            return res.json({
                state: 'error',
                message: 'Metai, kuriais gimė, asmuo negali būti sulaukęs pilnametystės',
            });
        }
        if(monthOfBirth >= 8){
            return res.json({
                state: 'error',
                message: 'Mėnuo, kurį gimė, asmuo negali būti sulaukęs pilnametystės',
            });
            
        }
    
        if(dayOfBirth >= 28){
            return res.json({
                state: 'error',
                message: 'Diena, kurią gimė, asmuo negali būti sulaukęs pilnametystės',
            });
            
            
        }
    // users.push(req.body);
    users[req.body.name+'-'+req.body.surname]=req.body;
    console.log(JSON.stringify(users))
    console.log(req.body)
    

    //post - body

    // get - params


    console.log(req.body.name)

   
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


