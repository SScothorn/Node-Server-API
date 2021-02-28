import { Context } from "koa";
import Router from "koa-router";
import OperatorsController from "../controllers/operatorsController";

const router = new Router();
const operatorsController = new OperatorsController();

router.get(`/operators`, operatorsController.get);
router.get(`/operators/getClosest`, operatorsController.getClosest);
router.post(`/operators/updatePos`, operatorsController.updatePos);
router.head(`/operators/clearTable`, operatorsController.clearTable);
router.head(`/operators/populateTable`, operatorsController.populateTable);

export default router;