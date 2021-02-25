import { AddFilmRequest } from '../../src/requests/AddFilmRequest';
import { validate } from "class-validator";

describe("request/addFilmRequest", () =>
{

    let addFilmRequest: AddFilmRequest;
    const validatorOptions = {};

    beforeAll(() =>
    {
        addFilmRequest = new AddFilmRequest();
    });

    it(`has the expected class properties'`, async () =>
    {
        addFilmRequest.name = "a game name here";
        expect(addFilmRequest.name).toBeDefined();
    });

    describe(`'name' validation`, () =>
    {

        it('is valid', async () =>
        {
            for (let i = 1; i <= 20; ++i)
            {
                addFilmRequest.name = "x".repeat(i);
                expect(
                    await validate(addFilmRequest, validatorOptions)
                ).toHaveLength(0);
            }
        });

        it('must have length of 1 character or greater', async () =>
        {
            addFilmRequest.name = '';
            expect(
                await validate(addFilmRequest, validatorOptions)
            ).toHaveLength(1);
        });

        it('must have a length of 20 characters or fewer', async () =>
        {
            addFilmRequest.name = 'y'.repeat(21);
            expect(
                await validate(addFilmRequest, validatorOptions)
            ).toHaveLength(1);
        });
    });
});