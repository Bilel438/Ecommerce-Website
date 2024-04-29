import express from "express";
const router = express.Router();
import {createCategory , updateCategory , deleteCategory , getAllCategories , readCategoryById} from "../controllers/categoryController.js"
import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js"





router.route("/").post(authenticate, authorizeAdmin,createCategory)



router.route("/:categoryId").put(authenticate, authorizeAdmin ,updateCategory)



router.route('/:categoryId').delete(authenticate, authorizeAdmin , deleteCategory)



router.route('/categories').get(authenticate, authorizeAdmin, getAllCategories)



router.route('/:id').get(authenticate, authorizeAdmin, readCategoryById)

export default router ;