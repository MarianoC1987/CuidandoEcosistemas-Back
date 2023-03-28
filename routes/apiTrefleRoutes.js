const express = require("express");
const {
  searchApiTrefle,
  dataApiTrefle,
} = require("../controllers/apiTrefleController");

const router = express.Router();

router.get("/search", searchApiTrefle);
router.get("/slug/:slug", dataApiTrefle);

module.exports = router;
