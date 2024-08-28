import express from 'express';


export const apiRouter = express.Router({mergeParams:true,});



apiRouter.get('/', (req, res) => {
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
    users.push(req.body.account);
    const name = req.params.name;
    const surname = req.params.surname;
    const yearOfBirth = req.params.yearOfBirth;
    const monthOfBirth = req.params.monthOfBirth;
    const dayOfBirth = req.params.dayOfBirth;
   if(name === ''){
    return res.json({
        state: 'error',
        message: 'Vardas turi būti įrašytas',
    });
}
if(name+surname === name+surname){
    return res.json({
        state: 'error',
        message: 'Vardas ir pavardė jau užregistruoti, negali kartotis. ',
    });
}

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
    return res.json({
        state: 'success',
        message: 'Vardas, pavardė ir gimimo data pridėta.',
    });

});


apiRouter.get('/account/req.params.name-req.params.surname', (req, res) => {
    if ((req.params.name.toLowerCase() && req.params.surname.toLowerCase()).to) {


    }    
    return res.json(users);
});



