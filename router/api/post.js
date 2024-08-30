import express from 'express';


export const apiRouter = express.Router({mergeParams:true,});



apiRouter.post('/account', (req, res) => {
    console.log(req.body.name)
    const name = req.body.name;
    const surname = req.body.surname;
    const yearOfBirth = req.body.yearOfBirth;
    const monthOfBirth = req.body.monthOfBirth;
    const dayOfBirth = req.body.dayOfBirth;
    
        if(name === ''){
            return res.json({
                state: 'error',
                message: 'Vardas turi būti įrašytas',
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
            if(balance !== 0){
                return res.json({
                    state: 'error',
                    message: 'Kurdami sąskaitą negalite iškart įnešti pinigų.',
                });       
        }
    users.push(req.body);
    // users[req.body.name+'-'+req.body.surname]=req.body;
    console.log(JSON.stringify(users))
    console.log(req.body)
    

    //post - body

    // get - params


 
   
    return res.json({
        state: 'success',
        message: 'Vardas, pavardė ir gimimo data pridėta.',
    });

});