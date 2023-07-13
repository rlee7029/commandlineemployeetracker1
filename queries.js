async function queryDepartment(connection) {
    const [rows] = await connection.query('SELECT * FROM department');
    return rows;
  }
  
  async function queryRole(connection) {
    const [rows] = await connection.query('SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id');
    return rows;
  }
  
  async function queryEmployee(connection) {
    const [rows] = await connection.query(`
    SELECT 
         employee.id,
         employee.first_name,
         employee.last_name,
         role.title AS title,
         department.name AS department,
         role.salary AS salary,
         CONCAT(employeeMan.first_name, ' ', employeeMan.last_name) AS manager
       FROM 
         employee
         LEFT JOIN role ON employee.role_id = role.id
         LEFT JOIN department ON role.department_id = department.id
         LEFT JOIN employee AS employeeMan ON employee.manager_id = employeeMan.id`);
    return rows;
  }
  

  async function addDepartment(connection, name) {
    await connection.query('INSERT INTO department (name) VALUES (?)', [name]);
  }
  

  async function addRole(connection, title, salary, departmentId) {
    await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  }
  

  async function addEmployee(connection, firstName, lastName, roleId, managerId) {
    await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  }
  

  async function updateEmployeeRole(connection, employeeId, roleId) {
    await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }
  
  module.exports = {
    queryDepartment,
    queryRole,
    queryEmployee,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
  };
  