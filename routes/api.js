var express = require("express");
var router = express.Router();
var diagram_controller = require("../controllers/diagramController");
// POST request for creating api.
router.post("/diagram/", diagram_controller.diagram_post);

router.get("/diagram/", diagram_controller.diagram_get_all);

router.get("/diagram/:diagramId", diagram_controller.diagram_get_by_id);

router.put("/diagram/:diagramId", diagram_controller.diagram_update_by_id);

router.delete("/diagram/:diagramId", diagram_controller.diagram_delete_by_id);

module.exports = router;
