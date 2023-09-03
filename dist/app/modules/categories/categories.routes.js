"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const categories_controller_1 = require("./categories.controller");
const categories_validation_1 = require("./categories.validation");
const router = express_1.default.Router();
router.get('/', categories_controller_1.CategoryController.getAllFromDB);
router.get('/:id', categories_controller_1.CategoryController.getByIdFromDB);
router.post('/create-category', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(categories_validation_1.CategoryValidation.insertCategory), categories_controller_1.CategoryController.insertIntoDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(categories_validation_1.CategoryValidation.updateCategory), categories_controller_1.CategoryController.updateByIdFromDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), categories_controller_1.CategoryController.deleteByIdFromDB);
exports.categoryRoutes = router;
