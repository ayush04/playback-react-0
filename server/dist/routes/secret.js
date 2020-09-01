"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secret_1 = require("../controllers/secret");
const router = express_1.Router();
router.get('/id', secret_1.getClientId);
router.get('/key', secret_1.getAPIKey);
exports.default = router;
//# sourceMappingURL=secret.js.map