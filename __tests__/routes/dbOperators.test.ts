import server from "../../src/server";
import request from "supertest";

afterEach((done) =>
{
    server.close();
    done();
});

describe("request/operators", () =>
{
    it('should return a 201 status code', async () =>
    {
        const response = await request(server)
            .get("/operators")
            .send({});

        expect(response.status).toEqual(201);
    });
});

describe("request/operators/updatePos", () =>
{
    it('should return a validation failure if the game data is incorrect', async () =>
    {
        const response = await request(server)
            .post("/operators/updatePos")
            .send({});

        expect(response.status).toEqual(400);
        expect(response.type).toEqual("application/json");
        expect(response.body).toEqual({
            "status": "error",
            "data": [
                {
                    "target": {
                        "id": "",
                        "longitude": "",
                        "latitude": ""
                    },
                    "value": "",
                    "property": "id",
                    "children": [],
                    "constraints": {
                        "min": "id must not be less than 0",
                        "isInt": "id must be an integer number"
                    }
                },
                {
                    "target": {
                        "id": "",
                        "longitude": "",
                        "latitude": ""
                    },
                    "value": "",
                    "property": "longitude",
                    "children": [],
                    "constraints": {
                        "isNumber": "longitude must be a number conforming to the specified constraints"
                    }
                },
                {
                    "target": {
                        "id": "",
                        "longitude": "",
                        "latitude": ""
                    },
                    "value": "",
                    "property": "latitude",
                    "children": [],
                    "constraints": {
                        "isNumber": "latitude must be a number conforming to the specified constraints"
                    }
                }
            ]
        });
    });
});