const express = require('express');
const app = express();
const student = require('./model/Student');
const mongoose = require('mongoose');


app.use(express.json());

const connectDB = async () => {
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/deployingAPI?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.9')
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(`Error: ${error.message}`);
} 
};

connectDB();

app.post('/student',async (req,res) => {
    try {
        const {name,age,course,year,status} = req.body;
        
        if(!name || !age || !course || !year ){
            res.status(400).json({message:`Error: All fields are required`})
        }

        const newStudent = new student({
            name:name,
            age:age,
            course:course,
            year:year,
            status:status|| 'active'
        });

        await newStudent.save();

        res.status(201).json({message:"Student created successfully!!",student:newStudent});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});

app.get('/students', async(req,res) => {
    try {
        const list = await student.find();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})


app.listen(3000,() => {
    console.log("Server has started listening");
});
