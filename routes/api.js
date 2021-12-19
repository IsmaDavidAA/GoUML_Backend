var express = require("express");
var router = express.Router();
var diagram_controller = require("../controllers/diagramController");
// POST request for creating api.
router.post("/diagram/", diagram_controller.diagram_post);

module.exports = router;
