import server from "../../src/server";
import request from "supertest";

// Close after each test
afterEach((done) =>
{
    server.close();
    done();
});

describe("routes/healthCheck", () =>
{
    it("should pong", async () =>
    {
        const response = await request(server).get("/ping");
        expect(response.status).toEqual(200); // Returns OK
        expect(response.type).toEqual("application/json");
        expect(response.body.data).toEqual("pong");
    });
})