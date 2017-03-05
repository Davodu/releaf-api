import http from "http"; 
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import config from './config'; 
import routes from './routes';


const LocalStrategy = require('passport-local').Strategy; 


let app = express();
app.server = http.createServer(app);


//middleware
//parse application/json
app.use(bodyParser.json({
	limit: config.bodyLimit // limit size of data passed in
	}))


//passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
	usernameField: 'email', 
	passwordField: 'password'
},
Account.authenticate()
));

passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser());

 
//api routes v1

app.use('/v1',routes);
app.server.listen(config.port);

console.log(`Server started on ${app.server.address().port}`);

export default app; //export this app as default, if anyone imports app.js, they get this particular object back 










