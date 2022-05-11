import mysqlConfig from '../../dbConfig.js'
import mysql from 'mysql2/promise';

const getAllUsers = async (req, res) => {
    try {
        const email = req.email
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
        SELECT COUNT (*)
        AS email
        FROM users
        `
        const [data] = await con.query(sql);
        con.end();
        //res.send(data) // Prideti rendering i atskira puslapi, kuriame bus isvestas tekstas su zinute, kiek yra db user'iu.
        res.render('allUsers', {
            title: "Regsitered user number",
            style: 'main.css',
            data: data[0].email,
            email: email
        });
    } catch {
        res.status(400).send({ msg: 'Access denied.' })
    };
};

export default getAllUsers