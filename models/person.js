const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: String,
    require: true,
  },
  username: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
});
personSchema.pre('save', async function(next) {
  // use to convert passwod in hash
  const person = this;

  // now every time save funvtion is used then this will convert in hash
  if(!person.isModified('password')) return next(); 
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(person.password, salt);
    person.password = hashpass;
    next();
  } catch (error) {
    return next(err);
  }
});

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
