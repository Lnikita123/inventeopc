const express = require('express');
const router = express.Router();
const categoryController = require("../controller/categoryController")



router.post("/createCategory", categoryController.createCategory)
router.put("/updateCategory/:categoryById", categoryController.updateCategory)
router.delete("/deleteCategory/:categoryById", categoryController.deleteCategory)
router.get("/getCategory", categoryController.getCategory)


module.exports = router;