import { authJwt, verifySignup } from "../middleware";
var express = require("express");
var router = express.Router();
var diagram_controller = require("../controllers/diagramController");
var course_controller = require("../controllers/courseController");
var task_controller = require("../controllers/taskController");
var user_controller = require("../controllers/userController");
var auth = require("../controllers/authController");
// Diagram Routes
router.post(
  "/user/:userId/diagram/",
  [authJwt.verifyToken, authJwt.isStudent, authJwt.isAdmin],
  diagram_controller.diagram_post
);

router.get("/user/:userId/diagram/", diagram_controller.diagram_get_all);

router.get(
  "/user/:userId/diagram/:diagramId",
  diagram_controller.diagram_get_by_id
);

router.put(
  "/user/:userId/diagram/:diagramId",
  [authJwt.verifyToken, authJwt.isStudent, authJwt.isAdmin],
  diagram_controller.diagram_update_by_id
);

router.delete(
  "/user/:userId/diagram/:diagramId",
  [authJwt.verifyToken, authJwt.isStudent, authJwt.isAdmin],
  diagram_controller.diagram_delete_by_id
);

// Course Routes

router.get(
  "/user/:userId/course/",
  [authJwt.verifyToken],
  course_controller.course_get_all
);

router.get(
  "/user/:userId/course/:courseId",
  [authJwt.verifyToken],
  course_controller.course_get_all_from_a_user
);

router.get(
  "/user/:userId/course/:courseId",
  [authJwt.verifyToken],
  course_controller.course_get_by_id
);

router.post(
  "/user/:userId/course/",
  [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin],
  course_controller.course_post
);

router.put(
  "/user/:userId/course/:courseId",
  [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin],
  course_controller.course_post
);

router.delete(
  "/user/:userId/course/:courseId",
  [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin],
  course_controller.course_delete_by_id
);

// Task Routes

router.get(
  "/user/:userId/course/courseId/task/",
  [authJwt.verifyToken],
  task_controller.task_get_all
);

router.get(
  "/user/:userId/course/courseId/task/",
  [authJwt.verifyToken],
  task_controller.task_get_all_in_a_course
);

router.get(
  "/user/:userId/course/courseId/task/:taskId",
  [authJwt.verifyToken],
  task_controller.task_get_by_id
);
router.post(
  "/user/:userId/course/courseId/task/",
  [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin],
  task_controller.task_post
);

router.put(
  "/user/:userId/course/courseId/task/:taskId",
  [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin],
  task_controller.task_post
);

router.delete(
  "/user/:userId/course/courseId/task/:taskId",
  [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin],
  task_controller.task_delete
);

//Auth Routes
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/auth/signup",
  [verifySignup.checkDuplicateUserNameOrEmail, verifySignup.checkRolesExisted],
  auth.signup
);

router.post("/auth/signin", auth.signin);

//User Routes

router.get(
  "/user/",
  [authJwt.verifyToken, authJwt.isAdmin],
  user_controller.user_get_all
);

router.get(
  "/user/:userId",
  [authJwt.verifyToken, authJwt.isAdmin],
  user_controller.user_get_by_id
);

router.post(
  "/user/",
  [authJwt.verifyToken, authJwt.isAdmin],
  user_controller.user_post
);

router.put(
  "/user/:userId",
  [authJwt.verifyToken, authJwt.isAdmin],
  user_controller.user_put
);

router.delete(
  "/user/:userId",
  [authJwt.verifyToken, authJwt.isAdmin],
  user_controller.user_delete
);

module.exports = router;
