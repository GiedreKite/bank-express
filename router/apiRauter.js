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
    console.log(JSON.stringify(users))
    console.log(req.body)
    console.log(users)
    
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
        // console.log(key.toLowerCase() === userName.toLowerCase());
        // console.log(key.toLowerCase());
        // console.log(userName.toLowerCase());
        if (key.toLowerCase() === userName.toLowerCase()) {
            user = users[key];
            // console.log("CIA");
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

    //  console.log(users[userName].name)
    console.log(users)


      
    if (names[0] === userName) {
return res.send(`Vartotojo vardas ${user.name}, pavardė ${user.surname} ir jis yra gimęs  ${user.yearOfBirth} metais, ${user.monthOfBirth} mėnesį ir ${user.dayOfBirth} dieną`);
    } else {
        return res.send(`Vartotojo, vardu ${req.params.name} nera.`);
    }
   
  
});






apiRouter.delete('/account/:name-:surname', (req, res) => {
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



        //TODO: Padaryti tikrinima visu esamu users
        // if(name+surname === name+surname){
        //     return res.json({
        //         state: 'error',
        //         message: 'Vardas ir pavardė jau užregistruoti, negali kartotis. ',
        //     });
        // }

        
    //post - body


    apiRouter.get('/account/:name-:surname/:name', (req, res) => {
        const name = req.body.name.toLowerCase();
        const surname = req.body.surname.toLowerCase();
        const userName = name+'-'+surname;
        let user = null;
    
        for (const key in users) {
   
            if (key.toLowerCase() === userName.toLowerCase()) {
                user = users[key];
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

        return res.json({
            state: 'success',
            message: `Vartotojo vardas ${}`,
        });

    });

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
        // users[index]=null;
        const newUserName=user.name+"-"+user.surname;
        users[newUserName]=user;
        // users[index].push(newName)=req.body;
      
      
        return res.json({
            state: 'success',
            message: 'Vardas pakeistas.',
        });
    
    });   


  
     
    
       
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

apiRouter.post('/deposit', (req, res) => {

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
    message: `Įnešta pinigų suma, jikutis s1skaitoje: ${user.balance/100} Eur.`,
});


})



apiRouter.post('/withdrawal', (req, res) => {

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
            message: "Nepateiktrda pavardė."
        });
    }


    
    if (!("withdrawMoney" in req.body) || req.body.withdrawMoney <= 0 || req.body.withdrawMoney < user.balance) {
        return res.json({
            status: "error",
            message: "Nepateikta tinkama pinigų suma."
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
    message: `Įnešta pinigų suma, jikutis s1skaitoje: ${user.balance/100} Eur.`,
});


})

apiRouter.post('/transfer', (req, res) => {

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