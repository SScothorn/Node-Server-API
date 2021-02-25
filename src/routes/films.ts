import { Context } from "koa";
import Router from "koa-router";
const router = new Router();

router.post(`/films`, async (ctx: Context) =>
{
    try
    {
        ctx.status = 201;
        ctx.body = {
            films: [
                ctx.request.body.film
            ]
        };
    } catch (err)
    {
        console.error(err);
    }
});


export default router;