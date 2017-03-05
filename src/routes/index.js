import express from 'express';
import config from  '../config'; 
import middleware from '../middleware';

import initializeDb from '../db';
import Company from '../controller/releaf';
import account from '../controller/account';

let router = express();

//connect to mongoDb
initializeDb(db => {
	//Application level middleware, no mount path,executed every time the app receives a request.
	router.use(middleware({config, db}));

	//api routes v1 (/v1)
	router.use('/releaf', Company({config, db}));
	router.use('/account', account({config, db}));
})


export default router;