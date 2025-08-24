
import { Router } from 'express';
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
    loginUser,
    logoutUser,
    registerUser,
    upadateAccountDetails,
    updateUserAvatar
} from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.middlewares.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { get } from 'mongoose';
const router = Router();

router.route("/register").post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverPhoto', maxCount: 1 }

    ]),
    registerUser)

router.route("/login").post(loginUser)

//secure route
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/upadate-profile").patch(verifyJWT, upadateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-photo").patch(verifyJWT, upload.single("coverPhoto"), updateUserAvatar)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)





export default router;