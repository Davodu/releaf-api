## Overview
Test Api for Releaf group, an investment procurement platform that evaluates African SMEs and connects the most elite to investors.

## Technology Stack
- [NodeJs](https://nodejs.org/en/) (Server)
- [MongoDb](https://www.mongodb.com/) (Database)
- [Passport](http://passportjs.org/)(User & Admin Authentication)
- [RoboMongo](https://robomongo.org/)(MongoDb viewer)
- [Babel](https://babeljs.io/) (Transpiler from ES6 to traditional Javascript)

## Getting Started
Clone the repo:
```sh
git clone https://github.com/Davodu/releaf-api.git
cd releaf-api
```
Install all dependencies from package.json file
```js
npm i
```
To transpile from ES6 to traditional Javascript(Generated code will be saved in dict directory in project root)
```sh
npm run build
```
## Configuration
Configure the index.js file located in the config folder with the desired port to run the web server, and the MongoDB uri and the max data size
## Run
View package.json for full script 
```sh
npm run dev
```
## Reference & Other resources
- [Google](https://www.google.com ) <br>
- [API overview and server implememtation details](https://docs.google.com/document/d/1SmkemQDRdIufVBYm5SXV1TQ2iLmJLkqay19Jpb3OaBQ/edit?usp=sharing)
