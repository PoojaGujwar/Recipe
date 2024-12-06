const express = require("express")
const app = express()
const cors = require("cors")

const {initializeDatabase}  = require("./db/db.connection")
const NewRecipe= require("./models/recipe.model")

initializeDatabase()

app.use(cors())
app.use(express.json())



app.get("/",(req, res)=>{
    res.send("Hello, express")
})

app.get("/recipes",async(req,res)=>{
    try{
        const recipe = await NewRecipe.find()
        res.status(202).json(recipe)
    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
})
app.post("/recipes",async(req,res)=>{
    const data = req.body
    console.log(data)
    try{
        const recipe = new NewRecipe(data)
        await recipe.save()
    res.status(202).json({message:"Added Recipe",recipe})

    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
})
app.delete("/recipes/:id",async(req,res)=>{
    const recipeId = req.params.id
    try{
        const deletedRecipe = await NewRecipe.findByIdAndDelete(recipeId)
        if(! deletedRecipe){
            return res.status(404).json({error:"Recipe not found"})
        }
        res.status(200).json({message:"Deleted successfully",deletedRecipe})

    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
})

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log("Server is running on",PORT)
})
