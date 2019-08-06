import * as mysql from 'mysql';

const connection = mysql.createConnection({
    host:"106.12.82.83",
    user:"chongdu",
    password:"Cd@20190618",
    port:3306,
    database:"chongdu_db"
})


export default connection
