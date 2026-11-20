import { Router } from "express";
import { userRegistration } from "../controllers/user.controllers";

const router = Router()

router.route("/create-user").post(userRegistration)

export default router;