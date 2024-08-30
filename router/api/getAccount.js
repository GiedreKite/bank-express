import express from 'express';


export const apiRouter = express.Router({mergeParams:true,});

export function accountPost(req, res) {

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
    
    
}

