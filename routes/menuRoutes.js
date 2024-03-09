const express = require("express");
const Menudata = require("./../models/menu");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
     const data = req.body;
      const newItem = new Menudata(data);
      const response = await newItem.save();
      console.log("Data Saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const data = await Menudata.find();
      console.log("Data Fetch");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
    }
  });


  router.get('/:taste',async(req,res)=>{
    try {
      const taste= req.params.taste;
      if(taste=='Savory' || taste=='Fresh' || taste=='Refreshing'){
          const response= await Menudata.find({taste:taste})  
        console.log("Data fetched Successfully")
          res.status(200).json(response)
      }
      else{}
      res.status(404).json({ error: "Invalid taste" });
    } catch (error) {
      console.log(error);
    res.status(500).json({ error: "Internal error" });
    }
})

router.put('/:id',async(req,res)=>{
  try {
      const MenuId= req.params.id;
      const updateMenuData=req.body;
      
      const response=await Menudata.findByIdAndUpdate(MenuId,updateMenuData,{
          new:true,  // Return the updated document 
          runvalidators:true // Run Mongoose validate
      })
      if(!response){
          return res.status(400).json({error:'Dish not Found'});
      }

      console.log("data updated")
      res.status(200).json(response); 

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
     
  }
})

router.delete('/:id',async(req,res)=>{
  try {
      const MenuId= req.params.id;
      
      const response=await Menudata.findByIdAndDelete(MenuId)
      if(!response){
          return res.status(400).json({error:'Dish not Found'});
      }
      console.log("data Deleted")
      res.status(200).json({message:'Person Deleted successfully'}); 

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
     
  }
})
  module.exports=router;