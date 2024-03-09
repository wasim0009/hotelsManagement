const mongoose = require('mongoose')

const menuItem= new mongoose.Schema({
    
        "name": {
          "type": "string",
          "required": true
        },
        "price": {
          "type": "number",
          "required": true
        },
        "taste": {
          "type": "string",
          "enum":["Savory" ,"Fresh","Refreshing"],
          "required": true
        },
        "is_drink": {
          "type": "boolean",
          "required": true
        },
        "ingredients": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "required": true
        },
        "no_of_sales": {
          "type": "number",
          "required": true
        }
    
})

const menuItems= mongoose.model('menuItems',menuItem);
module.exports=menuItems;