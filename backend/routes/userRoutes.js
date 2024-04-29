import express from "express";
import { createUser , loginUser , logoutCurrentuser ,getAllUsers , getCurrentUserProfile , updateCurrentUserProfile , deleteUserById , getUserById , updateUserById, favoriteProduct} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
.post(createUser)
.get(authenticate, authorizeAdmin, getAllUsers);

http://localhost:9000/api/users/auth
router.post("/auth", loginUser);


router.post("/logout", logoutCurrentuser);


router.route('/profile')
.get(authenticate , getCurrentUserProfile)
.put(authenticate , updateCurrentUserProfile); 

// Admins routes
router.route("/:id")
.delete(authenticate, authorizeAdmin , deleteUserById)
.get(authenticate, authorizeAdmin , getUserById)
.put(authenticate, authorizeAdmin , updateUserById);



router.route('/fav').put(authenticate, favoriteProduct)






export default router ; 