import pool from '../dbConfig/dbConnector';
import { Context } from "koa";

class OperatorsController
{
    public async get(ctx: Context)
    {
        try
        {
            const client = await pool.connect();

            console.log("Client Connected");
            const sql = "SELECT * FROM operators";
            const { rows } = await client.query(sql);
            const operators = rows;

            client.release();

            ctx.status = 201;
            ctx.body = { operators };
        } catch (err)
        {
            ctx.status = 400;
            console.error(err);
        }
    }
}

export default OperatorsController;