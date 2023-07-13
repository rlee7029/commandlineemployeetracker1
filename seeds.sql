CREATE TABLE IF NOT EXISTS department ( 
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE IF NOT EXISTS employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO department (name) 
  select 'Sales'
  WHERE NOT EXISTS (SELECT * FROM department WHERE id=1);

 INSERT INTO department (name) 
  select 'Marketing'
  WHERE NOT EXISTS (SELECT * FROM department WHERE id=2); 

 INSERT INTO department (name) 
  select 'Engineering'
  WHERE NOT EXISTS (SELECT * FROM department WHERE id=3); 

 INSERT INTO role (title, salary, department_id)
  select 'Salesperson', 50000, 1
  WHERE NOT EXISTS (SELECT * FROM role WHERE id=1); 

 INSERT INTO role (title, salary, department_id)
  select 'Marketing Coordinator', 40000, 2
  WHERE NOT EXISTS (SELECT * FROM role WHERE id=2); 

INSERT INTO role (title, salary, department_id)
  select 'Software Engineer', 80000, 3
  WHERE NOT EXISTS (SELECT * FROM role WHERE id=3); 


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
  select 'John', 'Doe', 1, NULL
  WHERE NOT EXISTS (SELECT * FROM employee WHERE id=1); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
  select 'Jane', 'Smith', 2, 1
  WHERE NOT EXISTS (SELECT * FROM employee WHERE id=2); 

  INSERT INTO employee (first_name, last_name, role_id, manager_id) 
  select 'Mike', 'Johnson', 3, 1
  WHERE NOT EXISTS (SELECT * FROM employee WHERE id=3); 


