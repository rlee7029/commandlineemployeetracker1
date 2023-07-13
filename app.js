const fs = require('fs');
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { queryDepartment, queryRole, queryEmployee, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries');

// Database connection settings
const connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'employee_db',
});


async function executeSeedsFile() {
    try {
      const seeds = fs.readFileSync('seeds.sql', 'utf8');
      const statements = seeds.split(';').filter(statement => statement.trim() !== '');
  
      for (const statement of statements) {
        await connection.query(statement.trim() + ';');
      }
  
      console.log('Seeds file executed successfully!');
    } catch (error) {
      console.error('Error executing seeds file:', error);
    }
  }
  

async function startApp() {
  try {
  

    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    });


    switch (action) {
      case 'View all departments':
        await viewAllDepartments();
        break;
      case 'View all roles':
        await viewAllRoles();
        break;
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'Add a department':
        await promptAddDepartment();
        break;
      case 'Add a role':
        await promptAddRole();
        break;
      case 'Add an employee':
        await promptAddEmployee();
        break;
      case 'Update an employee role':
        await promptUpdateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        return;
    }


    startApp();
  } catch (error) {
    console.error('Error:', error);
    connection.end();
  }
}


async function viewAllDepartments() {
  const departments = await queryDepartment(connection);
  console.table('Departments:', departments);
}


async function viewAllRoles() {
  const roles = await queryRole(connection);
  console.table('Roles:', roles);
}


async function viewAllEmployees() {
  const employees = await queryEmployee(connection);
  console.table('Employees:', employees);
}


async function promptAddDepartment() {
  const { name } = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:',
  });

  await addDepartment(connection, name);
  console.log('Department added successfully!');
}


async function promptAddRole() {
  const departments = await queryDepartment(connection);

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:',
    },
    {
      name: 'salary',
      type: 'number',
      message: 'Enter the salary of the role:',
    },
    {
      name: 'departmentId',
      type: 'list',
      message: 'Select the department for the role:',
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);

  await addRole(connection, title, salary, departmentId);
  console.log('Role added successfully!');
}


async function promptAddEmployee() {
  const roles = await queryRole(connection);
  const employees = await queryEmployee(connection);

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      name: 'firstName',
      type: 'input',
      message: "Enter the employee's first name:",
    },
    {
      name: 'lastName',
      type: 'input',
      message: "Enter the employee's last name:",
    },
    {
      name: 'roleId',
      type: 'list',
      message: "Select the employee's role:",
      choices: roles.map((role) => ({ name: role.title, value: role.id })),
    },
    {
      name: 'managerId',
      type: 'list',
      message: "Select the employee's manager:",
      choices: [
        { name: 'None', value: null },
        ...employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      ],
    },
  ]);

  await addEmployee(connection, firstName, lastName, roleId, managerId);
  console.log('Employee added successfully!');
}


async function promptUpdateEmployeeRole() {
  const employees = await queryEmployee(connection);
  const roles = await queryRole(connection);

  const { employeeId, roleId } = await inquirer.prompt([
    {
      name: 'employeeId',
      type: 'list',
      message: 'Select the employee to update:',
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })),
    },
    {
      name: 'roleId',
      type: 'list',
      message: 'Select the new role for the employee:',
      choices: roles.map((role) => ({ name: role.title, value: role.id })),
    },
  ]);

  await updateEmployeeRole(connection, employeeId, roleId);
  console.log('Employee role updated successfully!');
}

async function initializeApp() {
    try {
        console.log('Welcome to the Employee Management System!');
      await executeSeedsFile();
     // console.log('Initialization complete!');
      startApp();
    } catch (error) {
      console.error('Error initializing the application:', error);
      connection.end();
    }
  }
  

  initializeApp();