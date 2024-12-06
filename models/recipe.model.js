const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name:String,
    cuisineType:String,
    image:String,
    ingredients:String,
    instructions:String
})


const NewRecipe = mongoose.model("NewRecipe",recipeSchema)
module.exports = NewRecipe