import pool from '../dbConfig/dbConnector';
import { Context } from 'koa';
import * as requests from '../requests/dbOperators';
import { validate } from 'class-validator';
import * as randomUtil from '../Util/random';
const https = require('https');

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
            const response = await client.query(`UPDATE operators SET longitude = ${updatePosRequest.longitude}, latitude = ${updatePosRequest.latitude} WHERE id = ${updatePosRequest.id}`);
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

    /**
     * Clears the current table, and populates it with 100 fresh records
     * using name generator and cordinate generator apis
     */
    public async populateTable(ctx: Context)
    {
        try
        {
            interface IOperator
            {
                firstName: string;
                surname: string;
                active: boolean;
                longitude: number;
                latitude: number;
            }
            const operators: IOperator[] = [];
            interface INameResponse
            {
                name: {
                    first: string;
                    last: string;
                };
            }
            let names: INameResponse[] = [];
            interface ICoordinates
            {
                latitude: number;
                longitude: number;
            }

            const numberOfRecords: number = 100;
            let coordinates: ICoordinates[] = [];
            const bedminster: ICoordinates = { latitude: 51.434, longitude: -2.615 };
            const eastville: ICoordinates = { latitude: 51.473, longitude: -2.557 };

            const url: string = `https://randomuser.me/api/?results=${numberOfRecords}&&?format=json`;

            // Get 100 Names from the api
            let promise = new Promise((resolve, reject) =>
            {
                const req = https.get(url, (resp) =>
                {
                    let data = '';

                    // A chunk of data has been received.
                    resp.on('data', (chunk) =>
                    {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () =>
                    {
                        names = JSON.parse(data).results;
                        resolve(names);
                    });
                });

                req.on('error', (err) =>
                {
                    reject(err);
                });
            });

            await promise;

            // Clear table
            const client = await pool.connect();

            const truncateResponse = await client.query(`TRUNCATE TABLE operators`);

            // Collate 100 names and generate 100 coordinates that are in bristol because why not
            let sql = "INSERT INTO operators (firstname, surname, active, latitude, longitude) VALUES ";
            names.forEach((name, i) =>
            {
                const row: string = `${i > 0 ? "," : ""}(\'${name.name.first}\', \'${name.name.last}\', ${Math.random() > 0.5}, ${randomUtil.randomBetween2Values(bedminster.latitude, eastville.latitude, 3)}, ${randomUtil.randomBetween2Values(bedminster.longitude, eastville.longitude, 3)})`
                sql += row;
                console.log(row);
            });
            sql += ";";
            console.log(sql);

            const insertResponse = await client.query(sql);
            const affectedOperators = insertResponse.rowCount;

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

        }
        catch (err)
        {
            ctx.status = 400;
            console.error(err);
        }
    }
}

export default OperatorsController;