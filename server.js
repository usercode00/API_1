const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');


app.use(express.json());
app.use(cors());

function readFile(){
    try {
        const data = fs.readFileSync('./data/students.json','utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        if(error.code === 'ENOENT'){
            return [];
        }
    }
    console.error("Error: ",error); 
}

function writeFile(studentsArray){
    try {
        fs.writeFileSync('./data/students.json',JSON.stringify(studentsArray,null,2));
    } catch (error) {
        console.error("Error writing file: ",error);
    }
}

app.post('/api/students', (req,res) => {
    try {
        const {name,age,course,year,status} = req.body;
        
        if(!name || !age || !course || !year ){
           return res.status(400).json({message:`Error: All fields are required`})
        }

        if(typeof age !== 'number' || age <= 0){
            return res.status(400).json({message:"Error: Age must be a positive number"});
        }

        const newStudent = {
            name:name,
            age:age,
            course:course,
            year:year,
            status:status|| 'active',
            id:Date.now()
        };
        const data = readFile();
        data.push(newStudent);
        writeFile(data);

        res.status(201).json({message:"Student created successfully!!",student:newStudent});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});

app.get('/api/students', (req,res) => {
    try {
        const list = readFile();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})


app.listen(3000,() => {
    console.log("Server has started listening");
});
