const express = require("express");
const { searchApiTrefle } = require("../controllers/apiTrefleController");

const router = express.Router();

router.get("/search", searchApiTrefle);

module.exports = router;
