import mysqlConfig from '../../dbConfig.js'
import mysql from 'mysql2/promise';

const getUserTutorials = async (req, res) => {
    try {
        const id = req.userID;
        const email = req.email;
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
    SELECT tutorials.id, user_id, title, content, private, email
    FROM tutorials
    JOIN users ON tutorials.user_id = users.id
    WHERE user_id = ?
    `
        const [data] = await con.query(sql, id)
        con.end();
        //res.send(data)
        res.render('user-tutorials', {
            title: "My tutorials",
            style: 'main.css',
            data: data,
            email: email
        });
    } catch (err) {
        res.status(500).send({ msg: { err } })
    }
}

export { getUserTutorials }