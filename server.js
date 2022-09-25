const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employee_db database.`)
);

app.get('api/movies', (req, res) => {
    db.query('SELECT * FROM employee', (err, data) => err ? res.status(500).json(err) : res.json(data))
})
app.post('/api/add-employee', (req, res) => {
    req.body
    db.query('INSERT INTO employee () employee')
})








app.get('/api/movies', (req, res) => res.json(db));

app.post('/api/movies', (req, res) => {
    db.query
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});