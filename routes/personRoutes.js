const express = require("express");
const Person = require("./../models/person");

const router = express.Router();

router.post("/", async (req, res) => {
    // Aisa bhi likh sakte hai  pr isme agar jyada field hai toh jyada baar likhna padega isliye direct data pass krdiya
    //   newPerson.name=data.name;
    //   newPerson.age=data.age;
    //   newPerson.work=data.work;
    //   newPerson.email=data.email;
    //   newPerson.address=data.address;
    //   newPerson.salary=data.salary;
  
    // aisa ab save nhi kr sakte isko (try and catch) and (async and wait use krna padega)
    //     newPerson.save((error,savedPerson)=>{
    //         if(error){
    //             console.log("Error saving person : ",error);
    //             res.status(500).json({error:'Internal server error'})
    //         }
    //         else{
    //             console.log('Data saved successfully');
    //             res.status(200).json(savedPerson);
    //         }
    //     })
    // })
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log("Data Saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("Data Fetch");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error" });
    }
  });


// this is called parametrised call 
router.get('/:worktype',async(req,res)=>{
    try {
      const worktype= req.params.worktype;
      if(worktype=='chef' || worktype=='waiter' || worktype=='manager'){
          const response= await Person.find({work:worktype})  
        console.log("Data fetched Successfully")
          res.status(200).json(response)
      }
      else{}
      res.status(404).json({ error: "Invalid worktype" });
    } catch (error) {
      console.log(error);
    res.status(500).json({ error: "Internal error" });
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const personId= req.params.id;
        const updatePersonData=req.body;
        
        const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,  // Return the updated document 
            runvalidators:true // Run Mongoose validate
        })
        if(!response){
            return res.status(400).json({error:'Person not Found'});
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
        const personId= req.params.id;
        
        const response=await Person.findByIdAndDelete(personId)
        if(!response){
            return res.status(400).json({error:'Person not Found'});
        }
        console.log("data Deleted")
        res.status(200).json({message:'Person Deleted successfully'}); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal error" });
       
    }
})


module.exports=router;