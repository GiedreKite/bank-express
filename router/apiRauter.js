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
import { apiRouterPut } from './api/put.js';

apiRouterPostTransfer
// import { apiRouterGetName } from './api/getName.js';




export const apiRouter = express.Router();

apiRouter.use('/account', apiRouterPost);

apiRouter.use('/account', apiRouterGet);

apiRouter.use('/account', apiRouterDelete);

apiRouter.use('/deposit', apiRouterPostDeposit);

apiRouter.use('/withdrow', apiRouterPostWithdrow);

apiRouter.use('/transfer', apiRouterPostTransfer);

apiRouter.use('/account', apiRouterPut)

// apiRouter.use('/account', apiRouterGetName);


{users}
apiRouter.get('/bank', (req, res) => {
    const data = {
        state: 'success',
        message: 'Jūs užėjote į Giedrės Narvilaitės Banką.',
    };
    return res.json(data);
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

