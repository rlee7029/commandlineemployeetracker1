# employeetracker1


## Description

With this application, a user can: 
- View all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.
- View all departments with a formatted table showing department names and department ids
- View all roles with the job title, role id, the department that role belongs to, and the salary for that role.
- View all employees with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
- Add a department to enter the name of the department and add that department to the database.
- Add a role to enter the name, salary, and department for the role and add that role to the database.
- Add an employee to enter the employee’s first name, last name, role, and manager, and add that employee to the database.
- Update an employee role to select an employee to update and their new role is updated in the database.

## Demo


[Click here for walk through video](https://youtu.be/oYdIsybwjZY)

## Technologies 

**Runtime:** Node.js

**Lanuage:** Javascript

**Dependencies:** 
{
  "dependencies": {
    "console.table": "^0.10.0",
    "inquirer": "^8.2.4",
    "mysql": "^2.18.1",
    "mysql2": "^3.5.1"
  }
}


## Installation

Install all the following dependencices:
```
npm install i --force

npm install mysql2

node app.js

## Usage

Excute MySQL in the terminal with the following command:
```
mysql -u root -p
```
Execute the schema file:
```
SOURCE db/schema.sql;
```
Seed the database:
```
SOURCE seeds.sql;
```
Run application:
```
npm start;
```