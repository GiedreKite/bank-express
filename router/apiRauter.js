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

// apiRouter.get('/account', (req, res) => {



// return res.json(users);
// });

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
    // console.log(JSON.stringify(users))
    // console.log(req.body)
    // console.log(users)
    
    return res.json({
        state: 'success',
        message: 'Vardas, pavardė ir gimimo data pridėta.',
    });

});


 
apiRouter.get('/account/:name-:surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const userName = name+'-'+surname;
    const names = Object.values(users).map(user => userName);
    console.log(userName)
    console.log(names)
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
    const surnameObj = data['Giedrė-Narvilaitė'].surname;
    const yearOfBirthObj = data['Giedrė-Narvilaitė'].yearOfBirth
    const monthOfBirthObj = data['Giedrė-Narvilaitė'].monthOfBirth
    const dayOfBirthObj = data['Giedrė-Narvilaitė'].dayOfBirth    
    const balanceObj = data['Giedrė-Narvilaitė'].balance;
    console.log(nameObj);
    console.log(surnameObj);
    console.log(yearOfBirthObj);
    console.log(monthOfBirthObj);
    console.log(dayOfBirthObj);
    console.log(balanceObj);
      
    if (names[0] === userName) {
return res.send(`Vartotojo vardas ${nameObj}, pavardė ${surnameObj} ir jis yra gimęs  ${yearOfBirthObj} metais, ${monthOfBirthObj} mėnesį ir ${dayOfBirthObj} dieną`);
    } else {
        return res.send(`Vartotojo, vardu ${req.params.name} nera.`);
    }
   
  
});

// apiRouter.delete('/api/account/:name-:surname', (req, res) => {
//     const { name, surname } = req.params;
//     const index = users.findIndex(account =>
//         users.name.toLowerCase() === name.toLowerCase() &&
//         users.surname.toLowerCase() === surname.toLowerCase()
//     );


//     if (index === -1) {
//         return res.json({
//             status: "error",
//             message: "Tokia sąskaita nerasta."
//         });
//     }

//     const account = users[index];

//     if (account.money !== 0) {
//         return res.json({
//             status: "error",
//             message: "Sąskaita negali būti ištrinta, sąskaitos likutis turi būti 0."
//         });

//     }



//     accounts.splice(index, 1);
//     return res.json({
//         status: "success",
//         message: "Sąskaita sėkmingai ištrinta."
//     });
// });

// apiRouter.put('/account/:name-:surname', (req, res) => {

//     return res.json({
//         status: 'success',
//         message: 'Siuo metu nera galimybes atnaujinti paskyros informacijos',
//     });
// });


// apiRouter.delete('/account/:name-:surname', (req, res) => {
//     const { index } = req.params;
//     const position = parseFloat(index);
//     const data = users;
//     const balanceObj = data['Giedrė-Narvilaitė'].balance;
//     console.log(balanceObj);

//     if (balanceObj !== 0 ) {
//         return res.json({
//             state: 'error',
//             message: 'Sąskaitoje negali būti pinigų, jei norite ją ištrinti.',
//         });
//     }
//     console.log(index)
//     console.log(position)
//     console.log(users.splice(position, 1))
//     users.splice(index, 1);

//     return res.json({
//         state: 'success',
//         message: 'Vartotojas ištrintas',
//     });
// });



        //TODO: Padaryti tikrinima visu esamu users
        // if(name+surname === name+surname){
        //     return res.json({
        //         state: 'error',
        //         message: 'Vardas ir pavardė jau užregistruoti, negali kartotis. ',
        //     });
        // }

        
    //post - body

    // apiRouter.put('/account/:name-:surname/:name', (req, res) => {
    //     const newName = req.body.newName
    //     const name = req.params.name.toLowerCase();
    //     const surname = req.params.surname.toLowerCase();
    //     let index = getIndex(name, surname);
      
    
    //     if (typeof newName !== 'object'
    //         || Array.isArray(req.body)
    //         || req.body === null) {
    //         return res.json({
    //             status: 'error',
    //             message: 'Netinkamas duomenų tipas, turi būti objektas',
    //         });
    // }

    //     const nameError = nameCheck(name);
    //     if (nameError !== '') {
    //         return res.json({
    //             status: 'error',
    //             message: nameError,
    //         });
    // }
    
    //     users[index].push(newName)=req.body;
      
    //     accountList[index].name = newName;
    //     return res.json({
    //         state: 'success',
    //         message: 'Vardas pakeistas.',
    //     });
    
    // });   


    
//     apiRouter.put('/account/:name-:surname/:name', (req, res) => {
//         let name = req.params.name.toLowerCase();;
//         const newName = null;
       
    
//         if (typeof req.body !== 'object'
//             || Array.isArray(req.body)
//             || req.body === null) {
//             return res.json({
//                 status: 'error',
//                 message: 'Netinkamas duomenų tipas, turi būti objektas',
//             });
//     }
//     name = newName
   
//         const nameError = nameCheck(newName);
//         if (nameError !== '') {
//             return res.json({
//                 status: 'error',
//                 message: nameError,
//             });
//     }
// name = newName
//         users[req.body.name+'-'+req.body.surname]=req.body.name;
//         console.log(JSON.stringify(users))
//         console.log(req.body)
//         console.log(users)
        
//         return res.json({
//             state: 'success',
//             message: 'Vardas pakeistas.',
//         });
    
//     });
    
    
     
    
       
//     apiRouter.use((err, req, res, next) => {
//         console.error(err.stack);
//         return res.status(500).send('Something broke!');
//     });
    

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