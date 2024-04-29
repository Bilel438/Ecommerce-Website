import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";



const createCategory = asyncHandler(async (req, res) => {

    try {

        const {name} = req.body;
        
        if (!name) {
            return res.json({error: "Category Name is required"})
           
        }

        const existingCategory = await Category.findOne({name});

        if (existingCategory) {
            return res.json({error: "Category already exists"})
        }

        const category = await new Category({name}).save();
        res.json(category);

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)

    }
    
})

const updateCategory = asyncHandler(async (req, res) => {
    try {

        const {name} = req.body;
        const {categoryId} = req.params;

        const category = await Category.findOne({_id: categoryId});

        if (!category) {
            return res.status(404).json({error: "Category not found"})
        }

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (error) {
    
    console.log(error)
    return res.status(500).json({error: "internal server errorrrr"})
}
    
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.categoryId);

        res.json(deleted)
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "internal server error"})

    }
    
})


const getAllCategories = asyncHandler(async (req, res) => {

    try {
        const allCategories = await Category.find({});
        res.json(allCategories)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "internal server errorrr"})

    }
    
})


const readCategoryById = asyncHandler(async (req, res) => {
    try {
       const category = await Category.findById({_id: req.params.id});

        res.json(category)



    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "internal server errorr"})

    }
    
})

export  { createCategory , updateCategory , deleteCategory , getAllCategories , readCategoryById}



 