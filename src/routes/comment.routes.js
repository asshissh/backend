import {Route} from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares';
import {
    addComment,
    createComment,
    deleteComment,
    getVideosComment
} from '../controllers/comment.controllers.js';
import { authorizeRoles } from '../middlewares/roleAuthorization.middlewares.js';


const router = Route();

router.use(verifyJWT,authorizeRoles("admin","user"));

router.route("/videoId").post(createComment).get(getCommentsByVideoId);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;