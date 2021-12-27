import { authJwt } from "../middleware";
var express = require("express");
var router = express.Router();
var diagram_controller = require("../controllers/diagramController");
var course_controller = require("../controllers/courseController");
var task_controller = require("../controllers/taskController");
var auth = require("../controllers/authController");
// Diagram Routes
router.post(
  "/user/:userId/diagram/",
  [authJwt.verifyToken, authJwt.isModerator],
  diagram_controller.diagram_post
);

router.get("/user/:userId/diagram/", diagram_controller.diagram_get_all);

router.get(
  "/user/:userId/diagram/:diagramId",
  diagram_controller.diagram_get_by_id
);

router.put(
  "/user/:userId/diagram/:diagramId",
  [authJwt.verifyToken, authJwt.isModerator],
  diagram_controller.diagram_update_by_id
);

router.delete(
  "/user/:userId/diagram/:diagramId",
  [authJwt.verifyToken, authJwt.isModerator],
  diagram_controller.diagram_delete_by_id
);

// Course Routes

router.get("/user/:userId/course/", course_controller.course_get_all);

router.get(
  "/user/:userId/course/:courseId",
  course_controller.course_get_all_from_a_user
);

router.get(
  "/user/:userId/course/:courseId",
  course_controller.course_get_by_id
);

router.post("/user/:userId/course/", course_controller.course_post);

router.put("/user/:userId/course/:courseId", course_controller.course_post);

router.delete(
  "/user/:userId/course/:courseId",
  course_controller.course_delete_by_id
);

// Task Routes

router.get("/user/:userId/course/courseId/task/", task_controller.task_get_all);

router.get(
  "/user/:userId/course/courseId/task/",
  task_controller.task_get_all_in_a_course
);

router.get(
  "/user/:userId/course/courseId/task/:taskId",
  task_controller.task_get_by_id
);
router.post("/user/:userId/course/courseId/task/", task_controller.task_post);

router.put(
  "/user/:userId/course/courseId/task/:taskId",
  task_controller.task_post
);

router.delete(
  "/user/:userId/course/courseId/task/:taskId",
  task_controller.task_delete
);

//Auth Routes

router.post("/auth/signup", auth.signup);

router.post("/auth/signin", auth.signin);

module.exports = router;
