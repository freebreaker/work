import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import connection from '../util/mysql';

const router = express.Router()

router.get(`/mlist`, async (req, res) => {

    const { year } = req.query

    const sql = `
    select 
    count(*) as counts,
    FROM_UNIXTIME(regtime/1000,'%c') AS "month"
    from chongdu_user WHERE FROM_UNIXTIME(regtime/1000,"%Y")=${year} GROUP BY month
    `

    await connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }

        const result = []

        result.length = 12

        rows.forEach(element => {
            const index = parseInt(element.month)
            result[index-1] = element.counts
        });

        return res.json({
            monthData:result,
        })
    });
})

router.get(`/dlist`, async (req,res)=>{

    const {month} = req.query

    if(!month){
        return res.json({
            success:false,
            msg:"月数据出错"
        })
    }

    const days = month.split("-").map(Number)

    const sql = `
    select 
    count(*) as counts,
    FROM_UNIXTIME(regtime/1000,'%e') AS day
    from chongdu_user WHERE FROM_UNIXTIME(regtime/1000,"%Y-%m")='${month}' GROUP BY day
    `

    await connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }

        const result = []

        result.length = new Date(days[0],days[1], 0).getDate()

        rows.forEach(element => {
            const index = parseInt(element.day)
            result[index-1] = element.counts
        });

        return res.json({
            monthData:result,
        })
    });
})


module.exports = router