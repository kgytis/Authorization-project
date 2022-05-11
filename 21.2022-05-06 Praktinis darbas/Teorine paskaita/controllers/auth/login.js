// DB releated imports
import mysql from 'mysql2/promise';
import mysqlConfig from '../../dbConfig.js';
// Encryption related imports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginScreen = async (req, res) => {
    res.render('login', {
        title: "Login",
        style: 'main.css'
    });
};

const loginUser = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
    SELECT *
    FROM users
    WHERE email =?
    `
        const [data] = await con.query(sql, req.body.email);
        // Password checking
        const match = await bcrypt.compare(req.body.password, data[0].password);
        // Token creation
        con.end();
        if (match) {
            console.log(data)
            const token = jwt.sign({ 'id': data[0].id, email: data[0].email }, process.env.JWTSECRET, { expiresIn: '60m' });
            res.cookie('accessToken', token, { httpOnly: true });
            res.redirect('/user-tutorials');
        } else return res.status(400).send({ msg: "Incorrect email or password." })
    } catch (err) {
        res.status(500).send({ err: 'Server error, please try again.' })
    };
};

export { loginScreen, loginUser }
