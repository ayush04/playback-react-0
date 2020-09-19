"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = express_1.Router();
router.post("/user/save", user_1.addUser);
router.get("/user/:id", user_1.getUser);
router.put("/user/login/status/:id", user_1.updateLoginStatus);
exports.default = router;
//# sourceMappingURL=user.js.map