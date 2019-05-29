# simple todo list

## be 
https://todo-kredivo.herokuapp.com
### run stage 
1. npm i 
2. create database in your local devices
3. create .env file you can se .env.example
4. run "npm run migrate-dev"
5. run "npm run watch"

### end point 
| endpoint        | query           | body  | method |
| ------------- |:-------------:| -----:|--------|
| /auth/register    | - | name,email,password | post|
| /auth/login     |    -   |   email, password | post
| /todo/user | q=[str], filter=[done,undone,all]|-   |  get |
|/todo/:id | -| -| get|
| /todo/:id|-|-|put|
| /todo/:id|-|-|delete|

### run test 
1. create database in your local devices
3. change db confjig file in './src/db/config.config.js' according to your db seting
4. run 'npm run migrate-test'
5. run "npm run seed-test
6. run "npm test"


* all above assuming already install sequilize cli globaly


## fe
https://todo-kredivo.firebaseapp.com/

1. npm i
2. npm start
3. the app will run on port 8083
 
> use mobile view for better experience
