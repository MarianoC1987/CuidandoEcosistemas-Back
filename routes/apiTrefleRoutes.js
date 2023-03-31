const express = require("express");
const {
  searchApiTrefle,
  dataApiTrefle,
} = require("../controllers/apiTrefleController");

const router = express.Router();

router.post("/search", searchApiTrefle);
router.get("/slug/:slug", dataApiTrefle);

module.exports = router;
