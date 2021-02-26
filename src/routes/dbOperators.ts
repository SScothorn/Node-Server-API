import { Context } from "koa";
import Router from "koa-router";
import OperatorsController from "../controllers/operatorsController";

const router = new Router();
const operatorsController = new OperatorsController();
import pool from '../dbConfig/dbConnector';

router.get(`/operators`, operatorsController.get);

export default router;