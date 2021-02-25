import server from "../../src/server";
import request from "supertest";

// Close after each test
afterEach((done) =>
{
    server.close();
    done();
});

describe("routes/films", () =>
{
    const films: string[] = [
        "Back To The Future",
        "Star Wars",
        "Taxi Driver"
    ];

    // Iterate through adding each film and see if it's returned
    films.forEach((film: string) =>
    {
        it(`Should allow ${film} to be added`, async () =>
        {
            const response = await request(server)
                .post("/films")
                .send({ film });
            expect(response.status).toEqual(201); // Returns Created
            expect(response.type).toEqual("application/json");
            expect(response.body).toEqual(
                {
                    films: [
                        film
                    ]
                }
            );
        });
    });
})