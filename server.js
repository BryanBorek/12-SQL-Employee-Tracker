const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

function accessDb() {
  inquirer.prompt([
    {
      type: 'list',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Exit'],
      message: 'What would you like to do now?',
      name: 'choices'
    }
  ])
    .then((answers) => {
      switch (answers.choices) {
        case 'View all departments':
          db.query('SELECT * FROM department', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see departments below')
            console.log(results);

            console.table(results);
            accessDb()
          });
          break;

        case 'View all roles':
          db.query('SELECT employee_role.title , employee_role.salary , department.department_name FROM employee_role , department WHERE employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see roles below')
            console.table(results);
            accessDb()
          });
          break;

        case 'View all employees':
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;

        case 'Add a department':
          addDpt()
          break;

        case 'Add a role':
          addRole()
          break;

        case 'Add an employee':
          addEmp()
          break;

        case 'Update employee role':
          updateEmp()
          break;

        case 'Exit':
          console.log('Goodbye')
          break;

        default:
          console.log('Goodbye')
          break;
      }
    })
}
accessDb();

function addDpt() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new department name?',
      name: 'newDpt'
    }
  ])
    .then((answers) => {
      db.query(`INSERT INTO department (department_name)
    VALUES  ('${answers.newDpt}');`, (err, results) => {
        if (err) {
          console.log(err);
        }
      });
      db.query('SELECT * FROM department', (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('Please see departments below')
        console.table(results);
        accessDb()
      });
    }
    )
}

function addRole() {
  //Trying to figure out a way to pass the options I want as the choices: in inquirer
  // let resultsToChoices;
  // db.query('SELECT department.department_name FROM department', (err, results) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //    resultsToChoices = JSON.stringify(results).replaceAll(`{"department_name":`,'').replaceAll('}','').replaceAll('[','').replaceAll(']','');
  //   console.log(resultsToChoices);
  // });

  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new role title?',
      name: 'newRoleTitle'
    },
    {
      type: 'input',
      message: 'What is the new role salary?',
      name: 'newRoleSalary'
    },
    {
      type: 'list',
      choices: ["Sales","Engineering","Finance","Legal"],
      message: 'What department?',
      name: 'newRoleDpt'
    }
  ])
    .then((answers) => {
      let newDptId;
      switch (answers.choices) {
        case "Sales":
          db.query(`INSERT INTO employee_role (title, salary, department_id)
          VALUES  ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 1);`, (err, results) => {
              if (err) {
                console.log(err);
              }
            });
          break;

        case "Engineering":
          db.query(`INSERT INTO employee_role (title, salary, department_id)
          VALUES  ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 2);`, (err, results) => {
              if (err) {
                console.log(err);
              }
            });
          break;
          
        case "Finance":
          db.query(`INSERT INTO employee_role (title, salary, department_id)
          VALUES  ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 3);`, (err, results) => {
              if (err) {
                console.log(err);
              }
            });
          break;
        
        case "Legal":
          db.query(`INSERT INTO employee_role (title, salary, department_id)
          VALUES  ('${answers.newRoleTitle}', '${answers.newRoleSalary}', 4);`, (err, results) => {
              if (err) {
                console.log(err);
              }
            });
          break;
        }
      db.query('SELECT employee_role.title , employee_role.salary , department.department_name FROM employee_role , department WHERE employee_role.department_id = department.id;', (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('Please see roles below')
        console.table(results);
        accessDb()
      });
    }
    )
}

function addEmp() {
  inquirer.prompt([
    {
      type: 'input',
      message: `What is the new employee's first name?`,
      name: 'newEmpFirst'
    },
    {
      type: 'input',
      message: `What is the new employee's last name?`,
      name: 'newEmpLast'
    },
    {
      type: 'list',
      choices: ['Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
      message: `What is the new employee's role?`,
      name: 'newEmpRole'
    },
    {
      type: 'list',
      choices: ['Bry', 'Ely'],
      message: `Who is the new employee's manager?`,
      name: 'newEmpManager'
    }
  ])
    .then((answers) => {
      const first = answers.newEmpFirst;
      const last = answers.newEmpLast;
      let manager = 0;
      switch (answers.newEmpManager) {
        case 'Bry':
          manager = 1;
          break;
        case 'Ely':
          manager = 2;
          break;
      }
      switch (answers.newEmpRole) {
        case 'Salesperson':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 1, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;

          case 'Lead Engineer':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 2, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;

          case 'Software Engineer':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 3, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;

          case 'Account Manager':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 4, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;
          
          case 'Accountant':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 5, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;

          case 'Legal Team Lead':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 6, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;

          case 'Lawyer':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 7, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;
      }
    })
}

function updateEmp() {
  inquirer.prompt([
    {
      type: 'input',
      message: `What is the employee's new role?`,
      name: 'newEmpRole'
    }
  ])
    .then((answers) => {
      const first = answers.newEmpFirst;
      const last = answers.newEmpLast;
      let manager = 0;
      switch (answers.newEmpManager) {
        case 'Bry':
          manager = 1;
          break;
        case 'Ely':
          manager = 2;
          break;
      }
      switch (answers.newEmpRole) {
        case 'Salesperson':
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  ('${first}', '${last}', 1, '${manager}')`, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
          db.query('SELECT B.first_name , B.last_name, A.first_name AS manager , employee_role.title , employee_role.salary , department.department_name FROM employee A, employee B, employee_role , department WHERE A.id = B.manager_id AND B.role_id = employee_role.id AND employee_role.department_id = department.id;', (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Please see employees below')
            console.table(results);
            accessDb()
          });
          break;
      }
    })
}