import mysqlConfig from '../../dbConfig.js'
import mysql from 'mysql2/promise';

const getTutorials = async (req, res) => {
    try {
        //console.log(!req.userID)
        if (!req.userID) {
            const con = await mysql.createConnection(mysqlConfig);
            const sql = `
            SELECT id, title, content, private
            FROM tutorials
            WHERE private = 0
            `
            const [data] = await con.query(sql)
            con.end();
            //res.send(data)
            res.render('allTutorials', {
                title: "Tutorial list",
                style: 'main.css',
                data: data,
                authorized: !req.userID
            });
        } else {
            //const id = req.userID;
            const email = req.email
            //const email = req.email;
            const con = await mysql.createConnection(mysqlConfig);
            const sql = `
            SELECT *
            FROM tutorials
            `;
            const [data] = await con.query(sql)
            con.end();
            //res.send(data)
            res.render('allTutorials', {
                title: "Tutorial list",
                style: 'main.css',
                data: data,
                email: email
            });
        }
    } catch (err) {
        res.status(500).send({ msg: 'Server error' })
    }
}

const newTutorial = async (req, res) => {
    try {
        const con = await mysql.createConnection(mysqlConfig);
        const sql = `
        INSERT INTO tutorials (user_id, title, content, private)
        VALUES (?, ?, ?, ?)
        `
        const newTutorial = {
            user_id: req.userID,
            title: req.body.title,
            content: req.body.content,
            private: req.body.private
        }

        await con.query(sql, [newTutorial.user_id, newTutorial.title, newTutorial.content, newTutorial.private]);
        con.end();
        res.redirect('/tutorials')
    } catch (err) {
        res.status(500).send('Server error');
    };
};

export { getTutorials, newTutorial }