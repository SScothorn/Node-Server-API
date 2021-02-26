import pool from '../dbConfig/dbConnector';
import { Context } from "koa";
import * as requests from "../requests/dbOperators";
import { validate } from 'class-validator';

class OperatorsController
{
    /** Returns the whole table */
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

    /** Updates the longitude and latitude of an operator */
    public async updatePos(ctx: Context)
    {
        try
        {
            // Validate the incoming request
            const validationOptions = {};

            const updatePosRequest = new requests.UpdatePosRequest();
            updatePosRequest.id = ctx.request.body.id || '';
            updatePosRequest.longitude = ctx.request.body.longitude || '';
            updatePosRequest.latitude = ctx.request.body.latitude || '';

            const errors = await validate(updatePosRequest, validationOptions);
            // console.log(errors);

            // Return early if invalid
            if (errors.length > 0)
            {
                ctx.status = 400;
                ctx.body = {
                    status: "error",
                    data: errors
                };

                return ctx;
            }

            // Push change to db
            const client = await pool.connect();

            // console.log("Client Connected");
            const sql = `UPDATE operators SET longitude = ${updatePosRequest.longitude}, latitude = ${updatePosRequest.latitude} WHERE id = ${updatePosRequest.id}`;
            const response = await client.query(sql);
            const affectedOperators = response.rowCount;

            client.release();

            // Return error if opertor doesn't exist
            if (affectedOperators > 0)
            {
                ctx.status = 201;
            }
            else
            {
                ctx.status = 400;
                ctx.body = {
                    status: "error",
                    data: "No Record Exists"
                };
            }
        } catch (err)
        {
            ctx.status = 400;
            console.error(err);
        }
    }
}

export default OperatorsController;