import express from 'express';
import { users } from '../../data/users.js';

export const apiRouterGet = express.Router();

 {users} ;

 
apiRouterGet.get('/:name-:surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const userName = name+'-'+surname;
    const names = Object.values(users).map(user => userName);
    console.log(userName)
    console.log(names)
   
      console.log(JSON.stringify(users))
    console.log(req.body)
    console.log(users)

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
