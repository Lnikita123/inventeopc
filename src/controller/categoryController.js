const categoryModel = require("../models/categoryModel")

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if(typeof value === 'number' && value.toString().trim.length === 0) return false
    return true

}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};


const createCategory = async function (req, res) {
    try{
 const {category, subcategory} = req.body

if(!isValidRequestBody(req.body)){
    return res.status(400).send({ status: false, messege: "please provide data in body" })
}
if (!isValid(category)) {
    return res.status(400).send({ status: false, messege: "category is required" })

}
if (!isValid(subcategory)) {
    return res.status(400).send({ status: false, messege: "subcategory is required" })

}

const duplicateCategory = await categoryModel.findOne({category: category })

if (duplicateCategory) {
    return res.status(409).send({ status: false, msg: " category is already present" , data:duplicateCategory})
}
   let  createdData = await categoryModel.create(req.body)
    return res.status(201).send({ status: true, messege: "category createdd successfully", data: createdData })
}

catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}




const updateCategory = async function (req, res) {

    try {
    const { category, subcategory } = req.body
    let categoryId = req.params.categoryId
    let updateCategoryBody = await categoryModel.findOneAndUpdate({categoryId: categoryId }, { $set: { category: category, subcategory: subcategory } }, { new: true })

    return res.status(200).send({ status: true, messege: "category updaated successfully", data: updateCategoryBody })

}

catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}


const deleteCategory = async function (req, res) {
    try{
    let categoryId = req.params.categoryId
    
    let findCateory = await categoryModel.deleteOne(categoryId)
    if (findCateory) {
        return res.status(200).send({ status: true, message: "category Delete Successfully", data: findCateory })
    } else
        return res.status(400).send({ status: false, message: "Id not present in db", data: null })
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const getCategory = async function (req, res) {
    try{
    let category = req.query.category
    let { page, size, sort } = req.query;
    if (!page) {
  
        // Make the Default value one
        page = 1;
    }

    if (!size) {
        size = 10;
    }
    const limit = parseInt(size);
    
   
    let allCategory = await categoryModel.find().sort({category:1, _id:-1}).limit(limit)
   return res.status(200).send({ status: true, message: "get all category", data: allCategory,page,size })
}

catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}

}




module.exports = { createCategory, updateCategory, deleteCategory, getCategory }



