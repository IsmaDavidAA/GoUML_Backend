var middlewareAuth = require("../middleware/authJwt");
var middlewareVerifySign = require("../middleware/verifySignup");
var express = require("express");
var router = express.Router();
var diagram_controller = require("../controllers/diagramController");
var course_controller = require("../controllers/courseController");
var task_controller = require("../controllers/taskController");
var user_controller = require("../controllers/userController");
var auth = require("../controllers/authController");
// Diagram Routes
router.post(
  "/diagram/",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isStudent,
    middlewareAuth.isAdmin,
  ],
  diagram_controller.diagram_post
);

router.get("/diagram/", diagram_controller.diagram_get_all);

router.get("/diagram/:diagramId", diagram_controller.diagram_get_by_id);

router.put(
  "/diagram/:diagramId",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isStudent,
    middlewareAuth.isAdmin,
  ],
  diagram_controller.diagram_update_by_id
);

router.delete(
  "/diagram/:diagramId",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isStudent,
    middlewareAuth.isAdmin,
  ],
  diagram_controller.diagram_delete_by_id
);

// Course Routes

router.get(
  "/course/",
  [middlewareAuth.verifyToken],
  course_controller.course_get_all
);

router.get(
  "/course/:courseId",
  [middlewareAuth.verifyToken],
  course_controller.course_get_all_from_a_user
);

router.get(
  "/course/:courseId",
  [middlewareAuth.verifyToken],
  course_controller.course_get_by_id
);

router.post(
  "/course/",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isTeacher,
    middlewareAuth.isAdmin,
  ],
  course_controller.course_post
);

router.put(
  "/course/:courseId",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isTeacher,
    middlewareAuth.isAdmin,
  ],
  course_controller.course_post
);

router.delete(
  "/course/:courseId",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isTeacher,
    middlewareAuth.isAdmin,
  ],
  course_controller.course_delete_by_id
);

// Task Routes

router.get(
  "/course/:courseId/task/",
  [middlewareAuth.verifyToken],
  task_controller.task_get_all
);

router.get(
  "/course/:courseId/task/",
  [middlewareAuth.verifyToken],
  task_controller.task_get_all_in_a_course
);

router.get(
  "/course/:courseId/task/:taskId",
  [middlewareAuth.verifyToken],
  task_controller.task_get_by_id
);
router.post(
  "/course/:courseId/task/",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isTeacher,
    middlewareAuth.isAdmin,
  ],
  task_controller.task_post
);

router.put(
  "/course/:courseId/task/:taskId",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isTeacher,
    middlewareAuth.isAdmin,
  ],
  task_controller.task_post
);

router.delete(
  "/course/:courseId/task",
  [
    middlewareAuth.verifyToken,
    middlewareAuth.isTeacher,
    middlewareAuth.isAdmin,
  ],
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
  [
    middlewareVerifySign.checkDuplicateUserNameOrEmail,
    middlewareVerifySign.checkRolesExisted,
  ],
  auth.signup
);

router.post("/auth/signin", auth.signin);

//User Routes

router.get(
  "/user/",
  [middlewareAuth.verifyToken, middlewareAuth.isAdmin],
  user_controller.user_get_all
);

router.get(
  "/user/:userId",
  [middlewareAuth.verifyToken, middlewareAuth.isAdmin],
  user_controller.user_get_by_id
);

router.post(
  "/user/",
  [middlewareAuth.verifyToken, middlewareAuth.isAdmin],
  user_controller.user_post
);

router.put(
  "/user/:userId",
  [middlewareAuth.verifyToken, middlewareAuth.isAdmin],
  user_controller.user_put
);

router.delete(
  "/user/:userId",
  [middlewareAuth.verifyToken, middlewareAuth.isAdmin],
  user_controller.user_delete
);

module.exports = router;
