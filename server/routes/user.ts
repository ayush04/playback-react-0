import { Router } from "express";
import { addUser, getUser, updateLoginStatus } from "../controllers/user";

const router = Router();

router.post("/user/save", addUser);
router.get("/user/:id", getUser);
router.put("/user/login/status/:id", updateLoginStatus);

export default router;
