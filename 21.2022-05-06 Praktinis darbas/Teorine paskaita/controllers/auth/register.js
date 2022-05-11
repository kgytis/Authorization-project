// DB releated imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';
// Encryption related imports
import bcrypt from 'bcryptjs';

const registrationScreen = async (req, res) => {
    res.render('register', {
        title: "Registration form",
        style: 'main.css'
    });
};

const newUser = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const hashedPassword = await bcrypt.hash(req.body.password, 5);
        const sql = `
        INSERT INTO users
        (email, password, reg_timestamp)
        VALUES (?, ?, ?)
        `;
        const timestamp = new Date().toLocaleString('LT');
        const data = await con.query(sql, [req.body.email, hashedPassword, timestamp]);
        con.end();
        res.send(data);
    } catch (err) {
        return res.status(500).send({ error: 'Server error, please try again.' });
    };
};

export { registrationScreen, newUser }